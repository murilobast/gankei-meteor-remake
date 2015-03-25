Template.posts.helpers({
	posts: function () {
		return Posts.find()//Meteor.call('getPosts');
	}
});

Template.posts.events({

});