Meteor.subscribe('profile');
Router.route('/', function(){
	this.render('home');
})

Router.route('/user/:server/:name', function(){
	var name = this.params.name;
	var server = this.params.server;
	console.log(name);
	this.render('test', {
		data: {
			name: name,
			server: server
		}
	});
})

Router.route('/profile/:_id', function(){
	if (this.params._id == 'login'){
		if (! Meteor.userId()) {
		 	this.render('login');
	 	}else{
	 		var name = Meteor.user().username;
			var image = Meteor.user().profile.image;
			this.render('profile', {
				data: {
					name: name,
					image: image
				}
			});
		}
	}else{
		var name = this.params._id;
		var image = Meteor.users.findOne({username: name}).profile.image || '/images/default.jpg';
		this.render('profile', {
			data: {
				name: name,
				image: image
			}
		});
	}
})
