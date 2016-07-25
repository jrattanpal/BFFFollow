({
    /**
     * All other components will use this method to log info
     * This will only work if debug is true; which is set when this component is included in other components
     * If false, then message will not be displayed in concole
     */
    log : function(component, event, helper) {
        var params = event.getParam('arguments');
        if (component.get('v.debug') == true && params && params[0]) {
            console.log(params[0].m);
        }
    },
    /**
     * Use e.force:navigateToURL event to redirect users
     * But if not in LEX then this might not be available
     * In that case, use normal window redirect
     */
    gotoURL : function (component, event, helper) {
        var params = event.getParam('arguments');
        if (params && params[0]) {
            var urlEvent = $A.get("e.force:navigateToURL");
            if(typeof(urlEvent) != 'undefined'){
                urlEvent.setParams({
                  "url": params[0].url
                });
                urlEvent.fire();
            }else{
                window.location.href = params[0].url;
            }
        }
        return false;
    },
    /**
     * Hide Toast message
     * This can be called manually or when x is clicked as Toast is closeable
     */
    hideToast: function(component, event, helper){
    	var div1 = component.find("showToastDiv");
    	$A.util.removeClass(div1, 'slds-show');
    	$A.util.addClass(div1, 'slds-hide');
    },
    /**
     * Data in Toast is sent from other components
     */
    showToast : function(component, event, helper) {
        var params = event.getParam('arguments');
        if (params && params[0]) {
        	$A.createComponents([
                ["ui:message",{
                    "title" : params[0].t,
                    "severity" : params[0].s,
                    "closable" : true
                }],
                ["ui:outputText",{
                    "value" : params[0].m
                }]
                ],
                function(components, status){
                    if (status === "SUCCESS") {
                        var message = components[0];
                        var outputText = components[1];
                        // set the body of the ui:message to be the ui:outputText
                        message.set("v.body", outputText);
                        var div1 = component.find("showToastDiv");

    					$A.util.addClass(div1, 'slds-show');
    					$A.util.removeClass(div1, 'slds-hide');
                        // Replace div body with the dynamic component
                        div1.set("v.body", message);
                    }
                }
            );
        }	    
	}
})