({
    /**
     * Check whether Chatter is enabled or not
     */
	checkChatterEnabled : function(component, helper, BFFHelper) {
        var apexBridge = component.find("ApexBridge");
        apexBridge.callApex({
            component: component,
            data: {
                operation: "BFFFollow_Controller",
                input: {mode: 'checkChatterEnabled'},
                debug: component.get('v.debug')
            },
            callBackMethod: function (data) {
                //If enabled then Fetch Followed users
                if(data.outputFlag == true){
                    component.set('v.checkChatterEnabled',true);
                    helper.fetchFollowedUsers(component, BFFHelper);
                }else{
                    //If not then set Boolean; used later on to show message about chatter not enabled
                    $A.util.toggleClass(component.find('chatterNotEnabledId'), 'slds-hide');
                }
            }
        });
    },
    /**
     * Fetch users Followed by current logged in user
     */
    fetchFollowedUsers : function(component, BFFHelper) {
            var apexBridge = component.find("ApexBridge");
            apexBridge.callApex({
                component: component,
                data: {
                    operation: "BFFFollow_Controller",
                    input: {mode: 'fetchFollowedRecords'},
                    debug: component.get('v.debug')
                },
                callBackMethod: function (data) {
                    //Only update followed user if data is returned
                    //Data is not returned if there is any error so users will see a generic message
                    if(data.outputFlag == true){
                        BFFHelper.hideToast();
                        component.set('v.followedUsers', data.output);
                    }else{
                        BFFHelper.showToast({s: 'error', t: 'Error!', m: 'Some error occurred while getting data. Make sure you have Followed at least 1 record.'});
                    }
                }
            });
	},
})