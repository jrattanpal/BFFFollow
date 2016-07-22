({
    /**
     * Run at the start of component
     */
	doInit : function(component, event, helper) {
		var BFFHelper = component.find("BFFFollow_Helper");
        //Before doing anything, check if chatter is enabled
        helper.checkChatterEnabled(component, helper, BFFHelper);

	},
	/**
	 * When Followed users change (added/removed) then update the list
	 * From this, it will be filtered down to other components and Drop downs will be updated properly
	 */
	handleUsersUpdated: function(component, event, helper){
		var BFFHelper = component.find("BFFFollow_Helper");
		BFFHelper.hideToast();

		var followedUsers = event.getParam("followedUsers");
        component.set('v.followedUsers', followedUsers);
	},
	/**
	 * Handle tab Click
	 * This setups the activeTabNumber; used later on to show/hide tabs
	 */
	onTabClick: function(component, event, helper){
		//var BFFHelper = component.find("BFFFollow_Helper");
		//BFFHelper.hideToast();
	    //Current clicked tab
		var selectedItem = event.currentTarget;
		component.set('v.activeTabNumber', selectedItem.getAttribute('tabindex'));
	}
})