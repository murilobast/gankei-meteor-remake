Meteor.methods({
	'updateUserImage': function(id, url){ 
		Meteor.users.update({_id: id}, {$set: {'profile.image': url}});
	}
})