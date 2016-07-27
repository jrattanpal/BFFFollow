({
	/**
	 * Update followed Users in database
	 */
	saveFollowedUsers : function(component, helper, BFFHelper, recordId, recordName) {
		//Add current user to existing user list
		var followedUsers = this.processFollowedUsers(component, BFFHelper, recordId, recordName);

		//If no changes were made then no need for Apex call
		if(followedUsers == null){
            BFFHelper.showToast({s: 'info', t: 'Info!', m: 'You have already followed selected record.'});
			return;
		}

		BFFHelper.log({m: 'BFFFollow_UserHelper.js:saveFollowedusers:followedUsers:: ' + followedUsers});

		
		var apexBridge = component.find("ApexBridge");
        apexBridge.callApex({
            component: component, 
            data: {
                operation: "BFFFollow_Controller",
                input: {mode: 'saveFollowedRecords', followedRecords: followedUsers},
                debug: component.get('v.debug')
            },
            callBackMethod: function (data) {
        		if(data.outputFlag == true){
            		BFFHelper.showToast({s: 'confirm', t: 'Success!', m: 'You are now following "'+recordName+'" .'});
        			helper.alertForFollowedUsers(component, BFFHelper, followedUsers);
        		}else{
            		BFFHelper.showToast({s: 'error', t: 'Error!', m: 'Some error occured while following record.'});
        		}
            }
        });
        /**/
        
	},
	/**
	 * Raise event when usrs have been successfully followed
	 */
	alertForFollowedUsers: function(component, BFFHelper, followedUsers){
		var appEvent = $A.get("e.c:BFFFollow_RecordsUpdated");
		BFFHelper.log({m: 'appEvent: '+ appEvent});
		appEvent.setParams({ "followedUsers" : JSON.parse(followedUsers) });
		BFFHelper.log({m: 'Firing e.c:BFFFollow_RecordsUpdated'});
		appEvent.fire();
	},
	/**
	 * Process users before saving
	 * This should tell whether the user has already been added or not
	 */
	processFollowedUsers: function(component, BFFHelper, recordId, recordName){
		var followedUsers = component.get('v.followedUsers');

		var followedUsersNew = Array();

		var recordExists = false;

		for(var i=0; i < followedUsers.length; i++){
			if(recordExists == false && followedUsers[i].id ==  recordId){
				recordExists = true;
			}
			followedUsersNew.push({id: followedUsers[i].id, name: followedUsers[i].name});
		}

		if(recordExists == false){
			followedUsersNew.push({id: recordId, name: recordName});
		}
		
		if(JSON.stringify(followedUsers) == JSON.stringify(followedUsersNew)){
			return null;
		}else{
			return JSON.stringify(followedUsersNew);
		}
	}
})