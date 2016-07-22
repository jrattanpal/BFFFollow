/**
 * Created by jrattanpal on 2016-07-22.
 */

public with sharing class LookupSObjectControllerResult {
    @AuraEnabled public String SObjectLabel {get; set;}
    @AuraEnabled public Id SObjectId {get; set;}

    public LookupSObjectControllerResult(String sObjectLabel, Id sObjectId)
    {
        this.SObjectLabel = sObjectLabel;
        this.SObjectId = sObjectId;
    }
}