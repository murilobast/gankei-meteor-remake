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

Router.route('/add', function(){
	this.render('postAdd');
})

Router.route('/post/:postId', function(){
	this.render('fullPost', {
		data: {
			postId: this.params.postId
		}
	});
})

Router.route('/edit/:postId', function(){
	this.render('postEdit', {
		data: {
			postId: this.params.postId
		}
	});
})

Router.route('/profile/:name', function(){
	var name = this.params.name;
	if (!Meteor.users.findOne({username: name})){
		this.render('notFound', {
			data: {
				user: true
			}
		});
	}else{
		var profile = Meteor.users.findOne({username: name}).profile;
		this.render('profile', {
			data: {
				name: name,
				profile: profile
			}
		});
	}
})

Template.body.rendered = function () {
	$('.editPost__tags, .addPost__tags').selectize({
	    //plugins: ['remove_button'],
	    plugins: ['restore_on_backspace'],
	    delimiter: ',',
	    persist: false,
	    create: function(input) {
	        return {
	            value: input,
	            text: input
	        }
	    }
	});
};