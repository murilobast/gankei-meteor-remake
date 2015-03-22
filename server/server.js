Meteor.publish("profile", function () {
  return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}});
});

Meteor.publish("freeweek", function () {
  return FreeWeek.find();
});

Meteor.methods({
	'updateUserImage': function(id, url){ 
		Meteor.users.update({_id: id}, {$set: {'profile.image': url}});
	}
})