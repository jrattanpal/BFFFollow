({
    log : function(component, event, helper) {
        var params = event.getParam('arguments');
        if (params && params[0]) {
            console.log(params[0].m);
        }
    }
})