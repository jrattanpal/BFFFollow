({
    /**
     * Fetch User feed
     */
	fetchUserFeed : function(component, BFFHelper, selectedUser) {
		var apexBridge = component.find("ApexBridge");
        apexBridge.callApex({
            component: component, 
            data: {
                operation: "BFFFollow_Controller",
                input: {mode: 'fetchObjectFeed', 'recId' : selectedUser},
                debug: component.get('v.debug')
            },
            callBackMethod: function (data) {
            	if(data.outputFlag == true){
                    component.set('v.currentDisplayedUser', selectedUser);
                    component.set('v.feedElements', data.output.elements);
                    if(data.output.elements.length <=0){
                        $A.util.toggleClass(component.find('noPostsForUser'), 'slds-hide');
                    }
                }else{
                    BFFHelper.showToast({s: 'error', t: 'Error!', m: 'Error occurred while getting feed data'})
                }
            }
        });
	},
})