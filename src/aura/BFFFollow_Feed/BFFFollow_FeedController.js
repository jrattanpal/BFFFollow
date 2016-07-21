({
	onSelectChange : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");

		helper.fetchFollowedUsers(component, BFFHelper);
	},
	refreshFeed: function(component, event, helper){
		component.set('v.currentDisplayedUser', '');
		
		var BFFHelper = component.find("BFFFollow_Helper");

		helper.fetchFollowedUsers(component, BFFHelper);
                    
	}
})