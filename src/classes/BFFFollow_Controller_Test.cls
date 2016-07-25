@isTest
public with sharing class BFFFollow_Controller_Test {
    @istest
    public static void BFFFollow_Controller_checkChatterEnabled_Positive_Test() {
        Map<String, String> data = new Map<String, String>{'mode'=>'checkChatterEnabled'};

        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'BFFFollow_Controller';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(d2.outputFlag, gd.containsKey('FeedItem'));

    }

    @istest
    public static void BFFFollow_Controller_fetchUserFeed_Positive_Test() {
        Profile p = [Select Id FROM Profile where name='System Administrator'];
        User u = [select Id from user where ProfileId=:p.Id limit 1];
        Map<String, String> data = new Map<String, String>{'mode'=>'fetchUserFeed', 'userId' => u.Id };

        //String data = '{"mode":"saveFollowedUsers","followedById":"'+u.Id+'","followedUsers":"[{"005":{"name":"user 1"},"006":{"name":"User 2"}}]"}';
        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'BFFFollow_Controller';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        //https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/connectAPI_TestingApex.htm
        // Build a simple feed item
        //https://gist.github.com/alouie-sfdc/2ac9bf52fefc72e3049c0e9ab2b933c9
        ConnectApi.FeedElementPage testPage = new ConnectApi.FeedElementPage();
        List<ConnectApi.FeedItem> testItemList = new List<ConnectApi.FeedItem>();
        testItemList.add(new ConnectApi.FeedItem());
        testItemList.add(new ConnectApi.FeedItem());
        testPage.elements = testItemList;

        // Set the test data
        ConnectApi.ChatterFeeds.setTestGetFeedElementsFromFeed(Network.getNetworkId(),
                ConnectApi.FeedType.UserProfile, u.id, testPage);


        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(d2.outputFlag, true);
        //System.assertEquals(d2.output.elements.size(), 2);

    }

    @istest
    public static void BFFFollow_Controller_saveFollowedUsers_Negative_Test() {
        Map<String, String> data = new Map<String, String>{'mode'=>'saveFollowedUsers',
                    'followedUsers'=>null};

        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'BFFFollow_Controller';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(d2.outputFlag, false);
        

        List<BFFFollow__c> objList = [SELECT Id FROM BFFFollow__c];
        System.assertEquals(objList.size(),0);
    }
    @istest
    public static void BFFFollow_Controller_fetchFollowedUserss_Negative_Test() {
        List<BFFFollow__c> objList = [SELECT Id FROM BFFFollow__c];
        System.assertEquals(objList.size(),0);


        String followedUsers = '[{"005":{"name":"user 1"},"006":{"name":"User 2"}}]';
        String data = '{"mode":"fetchFollowedUsers"}';
        ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'BFFFollow_Controller';
        d1.input = data;
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        System.debug(strD2);
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(d2.outputFlag, false);
        System.assertEquals(d2.output, null);
    }
    
	@istest
	public static void BFFFollow_Controller_saveFollowedUsers_Positive_Test() {
		Map<String, String> data = new Map<String, String>{'mode'=>'saveFollowedUsers',
    				'followedUsers'=>'[{"005":{"name":"user 1"},"006":{"name":"User 2"}}]'};

		ETLC_ApexBridge_Data d1 = new ETLC_ApexBridge_Data();
        d1.operation = 'BFFFollow_Controller';
        d1.input = ETLC_ApexBridge_Data.encodeData(data);
        d1.debug = true;

        String strD2 =  ETLC_ApexBridge_Controller.execute(d1.toJson());
        ETLC_ApexBridge_Data d2 = ETLC_ApexBridge_Data.fromJSON(strD2);
        System.assertEquals(d2.outputFlag, true);
        

        List<BFFFollow__c> objList = [SELECT Id FROM BFFFollow__c];
        System.assertEquals(objList.size(),1);


        data = new Map<String, String>{'mode'=>'saveFollowedUsers',
        'followedUsers'=>'[{"005":{"name":"user 1"},"006":{"name":"User 2"},"007":{"name":"User 3"}}]'};

        ETLC_ApexBridge_Data d3 = new ETLC_ApexBridge_Data();
        d3.operation = 'BFFFollow_Controller';
        d3.input = ETLC_ApexBridge_Data.encodeData(data);
        d3.debug = true;

        String strD4 =  ETLC_ApexBridge_Controller.execute(d3.toJson());
        ETLC_ApexBridge_Data d4 = ETLC_ApexBridge_Data.fromJSON(strD4);
        System.assertEquals(d4.outputFlag, true);

        objList = [SELECT Id FROM BFFFollow__c];
        System.assertEquals(objList.size(),1);


    }
	@istest
	public static void BFFFollow_Controller_fetchFollowedUsers_Positive_Test() {
		BFFFollow_Controller_saveFollowedUsers_Positive_Test();

        List<BFFFollow__c> objList = [SELECT Id FROM BFFFollow__c];
        System.assertEquals(objList.size(),1);

        System.debug('Test:::');
        System.debug([select followedUsers__c from BFFFollow__c]);


		String followedUsers = '[{"005":{"name":"user 1"},"006":{"name":"User 2"},"007":{"name":"User 3"}}]';
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
    /**/
}