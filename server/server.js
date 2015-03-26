Meteor.publish("profile", function () {
  return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile: 1}});
});

Meteor.publish("freeweek", function () {
  return FreeWeek.find();
});

Meteor.publish("posts", function () {
  return Posts.find();
});

Meteor.publish("comments", function () {
  return Comments.find();
});

Meteor.publish("img", function () {
  return Images.find();
});

Meteor.publish("avatar", function () {
  return Avatar.find();
});

Meteor.methods({
	'updateUserImage': function(user, url){ 
		Meteor.users.update({_id: user}, {$set: {'profile.image': url}});
	},
	'addPost': function(post){
		Posts.insert(post);
	},
	'removePost': function(id){
		Posts.remove(id);
	},
	addComment: function(comment){
		Comments.insert(comment);
	},
	uploadAvatar: function(image){
		Avatar.insert(image, function (err, fileObj) {
          if (err){
             // handle error
          } else {
             // handle success depending what you need to do
            var userId = Meteor.userId();
            var imagesURL = '/cfs/files/avatar/' + fileObj._id;
            console.log(fileObj);
            Meteor.users.update(userId, {$set: {'profile.avatar': imagesURL}});
          }
        });
	}
})