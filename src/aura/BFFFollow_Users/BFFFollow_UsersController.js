({
    /**
     * Handler for receiving the updateLookupIdEvent event
     */
    handleIdUpdate : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");

        // Get the Id from the Event
        var recordId = event.getParam("sObjectId");
        var recordName = event.getParam("sObjectname");
 
 		// Set the Id bound to the View
        component.set('v.recordId', recordId);        
        component.set('v.recordName', recordName);

        if(typeof(recordId) != 'undefined' && typeof(recordName) != 'undefined'){
            //In case Toast was visible before, hide it now to not confuse users
            BFFHelper.hideToast();

            helper.saveFollowedUsers(component, helper, BFFHelper, recordId, recordName);
        }else{
            BFFHelper.showToast({s: 'error', t: 'Error!', m: 'Search and Select at least one user'});
        }
    },
 
    /**
     * Handler for receiving the clearLookupIdEvent event
     */
    handleIdClear : function(component, event, helper) {
        var BFFHelper = component.find("BFFFollow_Helper");
        BFFHelper.hideToast();
        
        // Clear the Id bound to the View
        component.set('v.recordId', null);      
        component.set('v.recordName', null);
    }
})