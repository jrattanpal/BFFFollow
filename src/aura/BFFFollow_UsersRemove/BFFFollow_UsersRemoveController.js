({
	removeSelectedUsers : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");
		
		var usersToRemove = helper.removeFollowedUsers(component, BFFHelper);
		if(usersToRemove != null){
			helper.saveFollowedUsers(component, helper, BFFHelper, usersToRemove);
		}else{
			BFFHelper.showToast({s: 'info', t: 'Info!', m: 'Select a user to Un-Follow'});
		}
	},
	onSelectChange: function(component, event, helper){
		var selectedUserId = component.find('removeSelectedUsersSelect').get('v.value');
		if(selectedUserId == 0){
			$A.util.removeClass(component.find('removeSelectedUsers'), 'slds-show');
			$A.util.addClass(component.find('removeSelectedUsers'), 'slds-hide');
		}else{
			$A.util.addClass(component.find('removeSelectedUsers'), 'slds-show');
			$A.util.removeClass(component.find('removeSelectedUsers'), 'slds-hide');
		}
	}
})