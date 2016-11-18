({
    doInit : function(cmp) {
        //generate Option box for object selection
        var opts = [
            { value: "0", label: "Select Object" },
            { value: "Account", label: "Account" },
            { value: "Case", label: "Case"},
            { value: "User", label: "User"},
            { value: "Topic", label: "Topic"}
        ];
        cmp.find("InputSelectDynamic").set("v.options", opts);
    },
    onSelectChange : function(component, event, helper) {

        var selected = component.find("InputSelectDynamic").get("v.value");
        if(selected == 0){
            component.set('v.selectedObjLabel', '');
            component.set('v.selectedObjLabelPlural', '');
            component.set('v.selectedObjApi', '');
            component.set('v.selectedObjFieldToReturn', '');
            $A.util.addClass(component.find('LookupSObject'), 'slds-hide');
            return;
        }

        $A.util.removeClass(component.find('LookupSObject'), 'slds-hide');

        //Get data for selected objects to be passed on to LookupSObject component
        var opts = Array();
        opts["Case"] = { api: "Case", value: "Case", labelPlural: "Cases", fieldToReturn: "Subject" };
        opts["User"] = { api: "User", value: "User", labelPlural: "Users", fieldToReturn: "Name" };
        opts["Account"] = { api: "Account", value: "Account", labelPlural: "Accounts", fieldToReturn: "Name" };
        opts["Topic"] = { api: "Topic", value: "Topic", labelPlural: "Topics", fieldToReturn: "Name" };
        component.set('v.selectedObjLabel', opts[selected].value);
        component.set('v.selectedObjLabelPlural', opts[selected].labelPlural);
        component.set('v.selectedObjApi', opts[selected].api);
        component.set('v.selectedObjFieldToReturn', opts[selected].fieldToReturn);


        //do something else
    },
    /**
     * Handler for receiving the updateLookupIdEvent event
     */
    handleIdUpdate : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");
        BFFHelper.hideToast();

		if(component.get('v.followedUsers').length >= component.get('v.maxFollowedUsers')){
            BFFHelper.showToast({s: 'message', t: 'Limit exceeded!', m: 'Maximum number of allowed records ('+component.get('v.maxFollowedUsers')+') have already been followed!'});
            return;
        }

        if(component.find("InputSelectDynamic").get("v.value") == 0){
            BFFHelper.showToast({s: 'error', t: 'Select Object!', m: 'Select an Object before proceeding'});
            return;
        }

        // Get the Id from the Event
        var recordId = event.getParam("sObjectId");
        var recordName = event.getParam("sObjectname");
 
 		// Set the Id bound to the View
        component.set('v.recordId', recordId);        
        component.set('v.recordName', recordName);

        if(typeof(recordId) != 'undefined' && typeof(recordName) != 'undefined'){
            helper.saveFollowedUsers(component, helper, BFFHelper, recordId, recordName);
        }else{
            BFFHelper.showToast({s: 'error', t: 'Error!', m: 'Search and Select at least one item'});
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
});