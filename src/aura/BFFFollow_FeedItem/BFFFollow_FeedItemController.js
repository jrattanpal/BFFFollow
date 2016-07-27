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
	}
})