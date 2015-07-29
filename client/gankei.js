Router.route('/', {
	seo: {
		title: 'Home'
	},
	onBeforeAction: function(){
		Meteor.subscribe('freeweek');
		Meteor.subscribe('featured');
		Meteor.subscribe('champions');
		Meteor.subscribe('summoners');
		this.next();
	},
	action: function(){
		this.render('home')
	}
})

Router.route('/summoner/:region/:name', {
	seo: {
		title: 'Home'
	},
	onBeforeAction: function(){
		Meteor.subscribe('champions');
		Meteor.subscribe('summoners');
		if (!Session.get('tab')) {
			Session.set('tab', 'overview');
		}
		var name = this.params.name;
		var region = this.params.region;
		Session.set('name', name);
		Session.set('region', region);
		this.wait(Meteor.call('getSummonerInfo', name, region));
		this.next();
	},
	action: function(){
		var name = this.params.name;
		if (this.ready()) {
			this.render('summoner', {
				data: function() {
					return Summoners.findOne({name: name})
				}
			});
		}else{
			this.render('home');
		}
	}
})

Template.body.rendered = function () {	
	$("html").niceScroll({
		zindex: -1,
		cursorcolor: '#fff',
		cursoropacitymin: 0.0004,
		cursoropacitymax: 0.001,
		cursorborder: 0,
		cursorborderradius: 0,
		mousescrollstep: 60
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