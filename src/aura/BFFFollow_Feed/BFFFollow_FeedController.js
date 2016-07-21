({
	onSelectChange : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");

		helper.fetchFollowedUsers(component, BFFHelper);
	}
})