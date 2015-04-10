Meteor.subscribe('freeweek');
Meteor.subscribe('posts');

Template.home.helpers({
	getFreeweek: function(){
		return FreeWeek.find();
	},
	getFeatured: function(){
		return Featured.find();
	}
})

Template.home.events({

});

Template.featured.helpers({
	getType: function(type){
		configId = {
			02: 'NORMAL',
			14: 'DRAFT',
			04: 'RANKED SOLO',
			41: 'RANKED TEAM 3X3',
			42: 'RANKED TEAM 5X5',
			65: 'ARAM'
		}
		return configId[type];
	}
})