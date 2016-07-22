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
		
		var selectedItem = event.currentTarget;
		var tabindex = selectedItem.getAttribute('tabindex');
		component.set('v.activeTabNumber', tabindex);

		/*
		for(var i=1;i<4;i++){
			if(tabindex == i){
				$A.util.addClass(component.find('tab-li-scoped-'+i),'slds-active');
				$A.util.removeClass(component.find('tab-div-scoped-'+i),'slds-hide');
				$A.util.addClass(component.find('tab-div-scoped-'+i),'slds-show');

			}else{
				$A.util.removeClass(component.find('tab-li-scoped-'+i),'slds-active');
				$A.util.addClass(component.find('tab-div-scoped-'+i),'slds-hide');
				$A.util.removeClass(component.find('tab-div-scoped-'+i),'slds-show');
			}
		}
		*/
	}
})