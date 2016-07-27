public with sharing class BFFFollow_Controller extends ETLC_ApexBridge_Abstract  {
	private static Boolean debugFlag;
	public override void process(ETLC_ApexBridge_Data data) {
		debugFlag = data.debug;
        if (data.debug) System.debug('data BEFORE:' + data);
		// Depending on the mode, determine which operation to perform
        String mode = (String) data.getInputValue('mode');

		if (mode == 'checkChatterEnabled') {
			data.outputFlag = checkChatterEnabled();
		} else if (mode == 'fetchFollowedRecords') {
        	data.output = fetchFollowedRecords(UserInfo.getUserId());
        	data.outputFlag = (data.output == null)?false:true;
        } else if (mode == 'saveFollowedRecords') {
        	data.outputFlag = saveFollowedRecords(Userinfo.getUserid(),(String)data.getInputValue('followedRecords'));
        } else if (mode == 'fetchObjectFeed') {
        	data.output = fetchObjectFeed((String)data.getInputValue('recId'));
        	data.outputFlag = (data.output == null)?false:true;
        }

        if(debugFlag){System.debug('data AFTER:' + data);}
    }

	/**
	 *
	 */
	public Boolean checkChatterEnabled(){
		try{
			Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
			if(gd.containsKey('FeedItem')){
				return true;
			}
		}catch(Exception e){
			System.debug(e.getMessage());
		}
		return false;
	}
	/**
	 *
	 */
	public String fetchFollowedRecords(Id followedById){
		String soql = 'SELECT followedRecords__c FROM BFFFollow__c WHERE FollowedBy__c=\''+followedById+'\' limit 1';
		try{
			if(debugFlag){System.debug('fetchFollowedRecords:soql:'+soql);}
			List<sObject> dbRecords = ETLC_SecuredDB.query(soql);
			if(debugFlag){System.debug(dbRecords);}
			if(dbRecords.size() > 0){
				if(debugFlag){
					System.debug('fetchFollowedRecords::' + dbRecords[0].get('FollowedRecords__c'));
				}
				return (String)dbRecords[0].get('FollowedRecords__c');
			}
		}catch(Exception e){
			System.debug(e.getMessage());
		}
		return null;
	}
	/**
	 *
	 */
	public boolean saveFollowedRecords(Id followedById, String followedRecords){
		try{

			if(followedRecords == null){
				return false;
			}

			List<LookupSObjectControllerResult> results = new List<LookupSObjectControllerResult>();


			String [] fields = new String [] {'Name', 'bfffollow__followedBy__c', 'bfffollow__FollowedRecords__c'};

			//Although, ETLC_SecuredDB will check CRUD/FLS, we need to check Createable and updateable permissions for upsert
            // Obtaining the field name/token map for the Contact object
			Map<String,Schema.SObjectField> m = Schema.SObjectType.BFFFollow__c.fields.getMap();
			for (String fieldToCheck: fields) {
				// Check if the user has create access on the each field

				//if not accessible then return false
				//If not updatable then return false; update part of update
				//If not createdable then return false; insert part of upsert
				if (!m.get(fieldToCheck).getDescribe().isAccessible() ||
						!m.get(fieldToCheck).getDescribe().isUpdateable() ||
						!m.get(fieldToCheck).getDescribe().isCreateable()) {
					return false;
				}
			}

			//extra fields are not required but just passing those through ETLC_SecuredDB for accessibility check
			String soql = 'SELECT Id, followedBy__c, followedRecords__c FROM BFFFollow__c WHERE FollowedBy__c=\''+String.escapeSingleQuotes(followedById)+'\' limit 1';

			if(debugFlag){System.debug('saveFollowedRecords:soql:'+soql);}

			List<sObject> dbRecords = ETLC_SecuredDB.query(soql);
			BFFFollow__c record = new BFFFollow__c();
			if(dbRecords.size() > 0){
				record.Id = (Id)dbRecords[0].get('Id');
			}
			record.FollowedRecords__c = followedRecords;
			record.followedBy__c = followedById;
			upsert record;
			if(debugFlag){ System.debug(record); }
			return true;
		}catch(Exception e){
			System.debug(e.getMessage());
		}
		return false;
	}
    /**
     * Return Object feed
     * Check object type based on object ID
     * If Case then use Record otherwise UserProfile
     */
	public String fetchObjectFeed(Id objId){
		try{
			if(!checkChatterEnabled()){
				return null;
			}
			String objectName = findObjectNameFromRecordIdPrefix(objId);
			ConnectApi.FeedElementPage fep;

            //Other than user, all other objects should return Record type
			if(objectName.equals('User')){
				fep = ConnectApi.ChatterFeeds.getFeedElementsFromFeed(Network.getNetworkId(), ConnectApi.FeedType.UserProfile, objId);
			}else if(objectName.equals('Topic')){
                fep = ConnectApi.ChatterFeeds.getFeedElementsFromFeed(Network.getNetworkId(), ConnectApi.FeedType.Topics, objId);
            }else{
				fep = ConnectApi.ChatterFeeds.getFeedElementsFromFeed(Network.getNetworkId(), ConnectApi.FeedType.Record, objId);
			}
			if(debugFlag){ System.debug(fep); }
			return JSON.serialize(fep);
		}catch(Exception e){
			System.debug(e.getMessage());
		}
		return null;
	}

	public static String findObjectNameFromRecordIdPrefix(String recordIdOrPrefix){
		String objectName = '';
		try {
			//Get prefix from record ID
			//This assumes that you have passed at least 3 characters
			String myIdPrefix = String.valueOf(recordIdOrPrefix).substring(0, 3);
			//Get schema information
			Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
			//Loop through all the sObject types returned by Schema
			for (Schema.SObjectType stype : gd.values()) {
				Schema.DescribeSObjectResult r = stype.getDescribe();
				String prefix = r.getKeyPrefix();
				//Check if the prefix matches with requested prefix
				if (prefix != null && prefix.equals(myIdPrefix)) {
					objectName = r.getName();
					break;
				}
			}
		}catch(Exception e){
		}
		return objectName;
	}
}