Template.right.helpers({
	username: function(){
		return Meteor.user().username;
	}
})

Template.aside.events({
	'click .content__side a': function () {
		if ($('.content').width() < 1200){
			var side = $('.content__side');
			side.css('margin-left', '-230px');
		}
	}
});
Template.right.events({
	'click .content__side__links__link__logout': function(){
		Meteor.logout();
	},
})