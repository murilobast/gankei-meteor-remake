Meteor.subscribe('freeweek');

Template.home.helpers({
	freeweek: function(){
		return FreeWeek.find();
	}
})