Template.login.events({
	'submit #login-form' : function(e, t){
		e.preventDefault();
		// retrieve the input field values
		var username = t.find('#login-username').value
		, password = t.find('#login-password').value;
		Meteor.loginWithPassword(username, password, function(err){
			if (err){
				console.log(err);
			}else{
			}
		});
		return false; 
	},
	'submit #register-form' : function(e, t) {
		e.preventDefault();
		var username = t.find('#account-username').value,
			password = t.find('#account-password').value,
			email = t.find('#account-email').value;
		//validations
		var trimInput = function(val) {
	    return val.replace(/^\s*|\s*$/g, "");
	  }
	  var isValid = function(val, num) {
     return val.length >= num;
	  }
	  //end of validations
	  email = trimInput(email);
	  username = trimInput(username);
		if(isValid(password, 6) && isValid(username, 6) && isValid(email, 8)){
			Accounts.createUser({
				username: username,
				password: password,
				email: email,
				profile: {
				    image: '/images/default.jpg',
				  }
			}, function(err){
				if (err) {
				} else {
				}
			});
		}
		return false;
	}
});