({
	fetchFollowedUsers : function(component, BFFHelper) {
		var selectedUser = component.find('UserList').get('v.value');                	
		if(selectedUser == 0){
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

            	BFFHelper.log({m: 'data:'});
            	BFFHelper.log({m: data.output});
            	if(data.outputFlag == true){
                	BFFHelper.log({m: 'data.output :'});
            		BFFHelper.log({m: data.output});

            		component.set('v.followedUsers', data.output);
                }
            }
        });
	},
})