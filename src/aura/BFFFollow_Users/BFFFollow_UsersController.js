({
	
	followUser : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");
                	
		helper.saveFollowedUsers(component, helper, BFFHelper);
	},
    removeSelectedUsers: function(component, event, helper){
        var checkboxData = component.find('checkbox');
        for(var i=0; i<checkboxData.length; i++){
            console.log(checkboxData[i].get('v.value'));
        }
        console.log(JSON.stringify(checkboxData));
    },
	/**
     * Handler for receiving the updateLookupIdEvent event
     */
    handleAccountIdUpdate : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");

        // Get the Id from the Event
        var recordId = event.getParam("sObjectId");
        var recordName = event.getParam("sObjectname");
 
 		// Set the Id bound to the View
        component.set('v.recordId', recordId);        
        component.set('v.recordName', recordName);
    },
 
    /**
     * Handler for receiving the clearLookupIdEvent event
     */
    handleAccountIdClear : function(component, event, helper) {
        // Clear the Id bound to the View
        component.set('v.recordId', null);
    }
})