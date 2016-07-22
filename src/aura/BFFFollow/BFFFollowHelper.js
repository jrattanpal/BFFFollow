({
	fetchFollowedUsers : function(component, BFFHelper) {
                	

		var apexBridge = component.find("ApexBridge");
        apexBridge.callApex({
            component: component, 
            data: {
                operation: "BFFFollow_Controller",
                input: {mode: 'fetchFollowedUsers'},
                debug: component.get('v.debug')
            },
            callBackMethod: function (data) {
            	if(data.outputFlag == true){
            		component.set('v.followedUsers', data.output);
                }
            }
        });
	},
})