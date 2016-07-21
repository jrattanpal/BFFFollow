({
	fetchFollowedUsers : function(component, BFFHelper) {
		var selectedUser = component.find('UserList').get('v.value');                	
		if(selectedUser == 0){
			return;
		}
        if(selectedUser == component.get('v.currentDisplayedUser')){
            return;
        }
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
                	BFFHelper.log({m: 'data.output :'});
            		BFFHelper.log({m: data.output});
                    BFFHelper.log({m: data.output.elements});
                    
                    component.set('v.currentDisplayedUser', selectedUser);
                    component.set('v.feedElements', data.output.elements);
                }
            }
        });
	},
})