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

Router.route('/profile/:uid', function(){
	this.render('profile');
})
