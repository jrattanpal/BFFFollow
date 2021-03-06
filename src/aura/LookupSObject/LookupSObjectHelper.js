/**
 * (c) Tony Scott. This code is provided as is and without warranty of any kind.
 *
 * This work by Tony Scott is licensed under a Creative Commons Attribution 3.0 Unported License.
 * http://creativecommons.org/licenses/by/3.0/deed.en_US
 */
({
    /**
     * Perform the SObject search via an Apex Controller
     */
    doSearch : function(cmp) {
        var BFFHelper = cmp.find("BFFFollow_Helper");
        // Get the search string, input element and the selection container
        var searchString = cmp.get('v.searchString');
        var inputElement = cmp.find('lookup');

        // Clear any errors and destroy the old lookup items container
        inputElement.set('v.errors', null);
        
        var lookupList = cmp.find('lookuplist').getElement();
                
        // We need at least 2 characters for an effective search
        if (typeof searchString === 'undefined' || searchString.length < 2)
        {
            // Hide the lookuplist
            $A.util.addClass(lookupList, 'slds-hide');
            return;
        }

        // Get the API Name
        var sObjectAPIName = cmp.get('v.sObjectAPIName');

        var sObjectFieldToReturn = cmp.get('v.objectFieldToReturn');

        // Create an Apex action
        var action = cmp.get('c.lookup');

        // Mark the action as abortable, this is to prevent multiple events from the keyup executing
        action.setAbortable();

        //console.log('sObjectFieldToReturn:' + sObjectFieldToReturn);

        // Set the parameters
        action.setParams({ "searchString" : searchString, "sObjectAPIName" : sObjectAPIName, "fieldToReturn": sObjectFieldToReturn});
                          
        // Define the callback
        action.setCallback(this, function(response) {
            var state = response.getState();
            // Callback succeeded
            if (cmp.isValid() && state === "SUCCESS")
            {
                BFFHelper.hideToast();
                // Get the search matches
                var matches = response.getReturnValue();

                // If we have no matches, return nothing
                if (matches.length == 0)
                {
                    cmp.set('v.matches', null);
                    return;
                }
                // Show the lookuplist
                $A.util.removeClass(lookupList, 'slds-hide');
                
                // Store the results
                cmp.set('v.matches', matches);
            }
            else if (state === "ERROR") // Handle any error by reporting it
            {
                console.log('test');
                var errors = response.getError();
                
                if (errors) 
                {
                    if (errors[0] && errors[0].message) 
                    {
                        this.displayToast(cmp, 'Error', errors[0].message);
                    }
                }
                else
                {
                    this.displayToast(cmp, 'Error', 'Unknown error.');
                }
            }
        });
        
        // Enqueue the action                  
        $A.enqueueAction(action);                
    },

    /**
     * Handle the Selection of an Item
     */
    handleSelection : function(cmp, event) {
        // Resolve the Object Id from the events Element Id (this will be the <a> tag)
        var objectId = this.resolveId(event.currentTarget.id);

        // The Object label is the inner text)
        var objectLabel = event.currentTarget.innerText;
                
        cmp.set('v.objectId',objectId);
        cmp.set('v.objectLabel', objectLabel);

        // Update the Searchstring with the Label
        cmp.set("v.searchString", objectLabel);

        // Hide the Lookup List
        var lookupList = cmp.find("lookuplist").getElement();
        $A.util.addClass(lookupList, 'slds-hide');

        // Hide the Input Element
        var inputElement = cmp.find('lookup');
        $A.util.addClass(inputElement, 'slds-hide');

        // Show the Lookup pill
        var lookupPill = cmp.find("lookup-pill");
        $A.util.removeClass(lookupPill, 'slds-hide');

        // Show the Lookup button
        var lookupButton = cmp.find("lookup-button");
        $A.util.removeClass(lookupButton, 'slds-hide');

        // Lookup Div has selection
        var inputElement = cmp.find('lookup-div');
        $A.util.addClass(inputElement, 'slds-has-selection');

    },

    fireEvent: function(cmp){
        // Resolve the Object Id from the events Element Id (this will be the <a> tag)
        var objectId = cmp.get('v.objectId');

        // The Object label is the inner text)
        var objectLabel = cmp.get('v.objectLabel');

        // Create the UpdateLookupId event
        var updateEvent = cmp.getEvent("updateLookupIdEvent");
        
        // Get the Instance Id of the Component
        var instanceId = cmp.get('v.instanceId');

        // Populate the event with the selected Object Id and Instance Id
        updateEvent.setParams({
            "sObjectId" : objectId, 
            "instanceId" : instanceId,
            "sObjectname" : objectLabel
        });

        // Fire the event
        updateEvent.fire();
    },

    /**
     * Clear the Selection
     */
    clearSelection : function(cmp) {
        // Create the ClearLookupId event
        var clearEvent = cmp.getEvent("clearLookupIdEvent");

        // Get the Instance Id of the Component
        var instanceId = cmp.get('v.instanceId');

        // Populate the event with the Instance Id
        clearEvent.setParams({
            "instanceId" : instanceId
        });
        
        // Fire the event
        clearEvent.fire();

        // Clear the Searchstring
        cmp.set("v.searchString", '');

        // Hide the Lookup pill
        var lookupPill = cmp.find("lookup-pill");
        $A.util.addClass(lookupPill, 'slds-hide');

        // Show the Lookup button
        var lookupButton = cmp.find("lookup-button");
        $A.util.addClass(lookupButton, 'slds-hide');

        // Show the Input Element
        var inputElement = cmp.find('lookup');
        $A.util.removeClass(inputElement, 'slds-hide');

        // Lookup Div has no selection
        var inputElement = cmp.find('lookup-div');
        $A.util.removeClass(inputElement, 'slds-has-selection');
    },

    /**
     * Resolve the Object Id from the Element Id by splitting the id at the _
     */
    resolveId : function(elmId)
    {
        var i = elmId.lastIndexOf('_');
        return elmId.substr(i+1);
    },

    /**
     * Display a message
     */
    displayToast : function (cmp, title, message) 
    {
        var BFFHelper = cmp.find("BFFFollow_Helper");
        BFFHelper.showToast({s: 'error', t: title, m: message});
    }
});