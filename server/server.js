Meteor.publish("profile", function () {
  return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}});
});

Meteor.publish("freeweek", function () {
  return FreeWeek.find();
});

Meteor.publish("posts", function () {
  return Posts.find();
});

Meteor.publish("img", function () {
  return Images.find();
});

Meteor.methods({
	'updateUserImage': function(id, url){ 
		Meteor.users.update({_id: id}, {$set: {'profile.image': url}});
	},
	'getPosts': function(){

		return Posts.find();
	}
})