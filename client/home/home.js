Meteor.subscribe('freeweek');
Meteor.subscribe('posts');

Template.home.helpers({
	freeweek: function(){
		return FreeWeek.find();
	}
})

Template.home.events({

});