({
	onSelectChange : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");

		var selectedUser = component.find('UserList').get('v.value');  
		if(selectedUser == 0){
			$A.util.addClass(component.find('refreshButton'), 'slds-hide');
			component.set('v.feedElements', null);
		}else{
			helper.fetchFollowedUsers(component, BFFHelper, selectedUser);
		}
	},
	handleUsersUpdated: function(component, event, helper){
		$A.util.addClass(component.find('refreshButton'), 'slds-hide');
		component.set('v.feedElements', null);
		component.set('v.currentDisplayedUser', 0);
	},
	refreshFeed: function(component, event, helper){
		component.set('v.currentDisplayedUser', '');
		
		var BFFHelper = component.find("BFFFollow_Helper");
		BFFHelper.hideToast();
		
		helper.fetchFollowedUsers(component, BFFHelper);
                    
	}
})