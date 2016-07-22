({
	fetchFollowedUsers : function(component, BFFHelper, selectedUser) {
		var apexBridge = component.find("ApexBridge");
        apexBridge.callApex({
            component: component, 
            data: {
                operation: "BFFFollow_Controller",
                input: {mode: 'fetchUserFeed', 'userId' : selectedUser},
                debug: component.get('v.debug')
            },
            callBackMethod: function (data) {
            	if(data.outputFlag == true){
                    BFFHelper.hideToast();

                    component.set('v.currentDisplayedUser', selectedUser);
                    component.set('v.feedElements', data.output.elements);
                }else{
                    BFFHelper.showToast({s: 'error', t: 'Error!', m: 'Error occured while getting feed data'})
                }
            }
        });
	},
})