({
	removeSelectedUsers : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");
		
		var usersToRemove = helper.removeFollowedUsers(component, BFFHelper);
		if(usersToRemove != null){
			helper.saveFollowedUsers(component, helper, BFFHelper, usersToRemove);
		}
	}
})