@isTest
public with sharing class BFFFollow_Controller_Test {
	@istest
	public static void BFFFollow_Controller_saveFollowedUsers_Positive_Test() {
		Map<String, String> data = new Map<String, String>{'mode'=>'saveFollowedUsers',
    				'followedUsers'=>'[{"005":{"name":"user 1"},"006":{"name":"User 2"}}]'};

		//String data = '{"mode":"saveFollowedUsers","followedById":"'+u.Id+'","followedUsers":"[{"005":{"name":"user 1"},"006":{"name":"User 2"}}]"}';
        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'BFFFollow_Controller';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(d2.outputFlag, true);
        

        List<BFFFollow__c> objList = [SELECT Id FROM BFFFollow__c];
        System.assertEquals(objList.size(),1);
	}
	@istest
	public static void BFFFollow_Controller_fetchFollowedUserss_Positive_Test() {
		BFFFollow_Controller_saveFollowedUsers_Positive_Test();

        List<BFFFollow__c> objList = [SELECT Id FROM BFFFollow__c];
        System.assertEquals(objList.size(),1);


		String followedUsers = '[{"005":{"name":"user 1"},"006":{"name":"User 2"}}]';
		String data = '{"mode":"fetchFollowedUsers"}';
        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'BFFFollow_Controller';
        d1.input = data;
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        System.debug(strD2);
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(d2.outputFlag, true);
        System.assertEquals(d2.output, followedUsers);
	}
}