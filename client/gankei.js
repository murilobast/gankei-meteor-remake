Router.route('/', {
	seo: {
		title: 'Home'
	},
	subscriptions: function(){
		return Meteor.subscribe('freeweek');
	},
	subscriptions: function(){
		return Meteor.subscribe('featured');
	},
	action: function(){
		this.render('home')
	}
})

Template.body.rendered = function () {	
	$("html").niceScroll({
		zindex: 100,
		cursorcolor: '#fff',
		cursoropacitymin: 0.05,
		cursoropacitymax: 0.3,
		cursorborder: 0,
		cursorborderradius: 0,
		mousescrollstep: 80
	})
	$('#select-server').select2({
		minimumResultsForSearch: -1 
	}).on('select2-opening',function(){
      	$(this).siblings('.select2-container').find('.select2-search, .select2-focusser').remove()
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

Router.configure({
	progress : true,
	progressSpinner: true,
	progressDelay : false
})