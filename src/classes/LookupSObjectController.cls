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
    public static LookupSObjectControllerResult[] lookup(String searchString, String sObjectAPIName, String fieldToReturn)
    {

        // Sanitze the input
        String sanitizedSearchString = String.escapeSingleQuotes(searchString);
        String sanitizedSObjectAPIName = String.escapeSingleQuotes(sObjectAPIName);
        String sanitizedFieldToReturn = String.escapeSingleQuotes(fieldToReturn);


        List<LookupSObjectControllerResult> results = new List<LookupSObjectControllerResult>();


        // Contact fields that will be copied from the Lead
        String [] userFields = new String [] {sanitizedFieldToReturn};

        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(sanitizedSObjectAPIName);
        // Obtaining the field name/token map for the Contact object
        Map<String,Schema.SObjectField> m = sObjectType.getDescribe().fields.getMap();
        for (String fieldToCheck: userFields) {
            // Check if the user has create access on the each field
            if (!m.get(fieldToCheck).getDescribe().isAccessible()) {
                return results;
            }
        }


        // Build our SOSL query
        String searchQuery = 'FIND \'' + sanitizedSearchString + '*\' IN ALL FIELDS RETURNING ' + sanitizedSObjectAPIName + '(id,'+sanitizedFieldToReturn+') Limit 50';

        // Execute the Query
        List<List<SObject>> searchList = search.query(searchQuery);

        if(searchList.size() > 0) {
            // Create a list of matches to return
            for (SObject so : searchList[0]) {
                System.debug(so);
                results.add(new LookupSObjectControllerResult((String) sanitizedSObjectAPIName + ':: ' + so.get(sanitizedFieldToReturn), so.Id));
            }
        }

        return results;
    }
}