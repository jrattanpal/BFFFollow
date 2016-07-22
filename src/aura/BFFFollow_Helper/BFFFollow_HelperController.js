({
    log : function(component, event, helper) {
        var params = event.getParam('arguments');
        if (component.get('v.debug') == true && params && params[0]) {
            console.log(params[0].m);
        }
    },
    hideToast: function(component, event, helper){
    	var div1 = component.find("showToastDiv");
    	$A.util.removeClass(div1, 'slds-show');
    	$A.util.addClass(div1, 'slds-hide');
    },
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