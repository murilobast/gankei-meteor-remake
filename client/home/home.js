Meteor.subscribe('freeweek');
Meteor.subscribe('posts');

Template.home.helpers({
	freeweek: function(){
		return FreeWeek.find();
	}
})
Template.home.events({
	'submit .form': function (e, t) {
		e.preventDefault();
		var text = t.find('.text').value;
		var image = t.find('.image').value;
		var post = {
			_id: '666',
			text: text,
			image: image
		}
		Posts.insert(post);
		return false;
	}
});