({
	/**
	 * Intercept clicks on links and pass those on to BFFHelper
	 * This is helpful to decide whether to redirect links as per LEX or classic
	 * This will also disable the click event so the link href doesn't take precendence and redirect users
	 */
	gotoURL : function(component, event, helper) {
		var selectedItem = event.currentTarget;

		var BFFHelper = component.find("BFFFollow_Helper");
		BFFHelper.gotoURL({url: selectedItem.getAttribute('href')});
		event.preventDefault();
	},
	/**
     * Run when different drop down option is selected
     */
	getUserFeed : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");
		BFFHelper.hideToast();

		var selectedUser = component.find('UserList').get('v.value');

        //Make sure user has selected correct user
		if(selectedUser == 0){
			$A.util.addClass(component.find('refreshButton'), 'slds-hide');
			component.set('v.feedElements', null);
		    component.set('v.currentDisplayedUser', null);
			component.set('v.currentDisplayedId', null);
		}else{
		    //If a real user has been selected then Fetch selected user's feed
			helper.fetchUserFeed(component, BFFHelper, selectedUser);
		}
	},
	/**
	 * If user list is updated then clear the Feed
	 */
	handleUsersUpdated: function(component, event, helper){
		$A.util.addClass(component.find('refreshButton'), 'slds-hide');
		component.set('v.feedElements', null);
		component.set('v.currentDisplayedUser', 0);
	}
})