({
	doInit : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");
                	
		helper.fetchFollowedUsers(component, BFFHelper);
	},
	handleUsersUpdated: function(component, event, helper){
		var followedUsers = event.getParam("followedUsers");
 		// Set the Id bound to the View
        component.set('v.followedUsers', followedUsers);
	},
	onClick: function(component, event, helper){
		//debugger;

		var selectedItem = event.currentTarget;
		$('li.slds-tabs--scoped__item').removeClass('slds-active');

		$('div.slds-tabs--scoped__content').removeClass('slds-show');
		$('div.slds-tabs--scoped__content').addClass('slds-hide');

		var tabLiId = selectedItem.getAttribute('aria-selectedTabLi');
		var tabDivId = selectedItem.getAttribute('aria-selectedTabDiv');

		$('#'+tabLiId).addClass('slds-active');
		$('#'+tabDivId).addClass('slds-show');
	}
})