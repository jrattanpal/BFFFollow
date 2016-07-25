/**
 * (c) Tony Scott. This code is provided as is and without warranty of any kind.
 *
 * This work by Tony Scott is licensed under a Creative Commons Attribution 3.0 Unported License.
 * http://creativecommons.org/licenses/by/3.0/deed.en_US
 */

 /**
 * Apex Controller for looking up an SObject via SOSL
 */
public with sharing class LookupSObjectController 
{
    /**
     * Aura enabled method to search a specified SObject for a specific string
     */
    @AuraEnabled
    public static LookupSObjectControllerResult[] lookup(String searchString, String sObjectAPIName)
    {

        // Sanitze the input
        String sanitizedSearchString = String.escapeSingleQuotes(searchString);
        String sanitizedSObjectAPIName = String.escapeSingleQuotes(sObjectAPIName);

        List<LookupSObjectControllerResult> results = new List<LookupSObjectControllerResult>();

        // Contact fields that will be copied from the Lead
        String [] userFields = new String [] {'Name'};

        // Obtaining the field name/token map for the Contact object
        Map<String,Schema.SObjectField> m = Schema.SObjectType.User.fields.getMap();
        for (String fieldToCheck: userFields) {
            // Check if the user has create access on the each field
            if (!m.get(fieldToCheck).getDescribe().isAccessible()) {
                return results;
            }
        }

        // Build our SOSL query
        String searchQuery = 'FIND \'' + sanitizedSearchString + '*\' IN ALL FIELDS RETURNING ' + sanitizedSObjectAPIName + '(id,name) Limit 50'; 

        // Execute the Query
        List<List<SObject>> searchList = search.query(searchQuery);

        if(searchList.size() > 0) {
            // Create a list of matches to return
            for (SObject so : searchList[0]) {
                results.add(new LookupSObjectControllerResult((String) so.get('Name'), so.Id));
            }
        }

        return results;
    }
    
    /**
     * Inner class to wrap up an SObject Label and its Id
     */
	public class Result
    {
        @AuraEnabled public String SObjectLabel {get; set;}
        @AuraEnabled public Id SObjectId {get; set;}
        
        public Result(String sObjectLabel, Id sObjectId)
        {
            this.SObjectLabel = sObjectLabel;
            this.SObjectId = sObjectId;
        }
    }
}