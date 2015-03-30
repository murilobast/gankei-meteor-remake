Meteor.subscribe('profile');

Router.configure({
    loadingTemplate: 'loading',
});

Router.onBeforeAction('loading');


Router.route('/', {
	seo: {
		title: 'Home'
	},
	action: function(){
		this.render('home')
	}
})

Router.route('/add', {
	seo: {
		title: 'Criar post'
	},
	action: function(){
		this.render('postAdd')
	}
})

Router.route('/post/:postId', {
	loadingTemplate: 'loading',
	waitOn: function(){
		var post = Posts.findOne(this.params.postId);
		Session.set('title', post.title);
	},	
	action: function(){
		this.render('fullPost', {
			data: {
				postId: this.params.postId
			}
		});
	}
});

Router.route('/edit/:postId', {
	seo: {
		title: 'Editar Post'
	},
	action: function(){
		this.render('postEdit', {
			data: {
				postId: this.params.postId
			}
		});
	}
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

// Router.route('/profile/:name', function(){
// 	var name = this.params.name;
// 	if (!Meteor.users.findOne({username: name})){
// 		this.render('notFound', {
// 			data: {
// 				user: true
// 			}
// 		});
// 	}else{
// 		var profile = Meteor.users.findOne({username: name}).profile;
// 		this.render('profile', {
// 			data: {
// 				name: name,
// 				profile: profile
// 			}
// 		});
// 	}
// })

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
	$("html").niceScroll({
		zindex: 100,
		cursorcolor: '#fff',
		cursoropacitymin: 0.05,
		cursoropacitymax: 0.3,
		cursorborder: 0,
		cursorborderradius: 0,
		mousescrollstep: 80
	})
};

Router.plugin('seo',{
	defaults: {
		title: 'Gankei',    
		suffix: 'Gankei',
		separator: '·',

		description: 'Gankei é uma ferramenta para League of Legends', 
		image: '',

		meta: {
			keywords: ['gankei', 'lol'],
			author: 'Murilo Bastos'
		},

		og: {
			site_name: 'Gankei',
			image: ''
			// etc.
		}
	}

});