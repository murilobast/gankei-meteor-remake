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
	'editPost': function(id, title, body, tags, published){
		Posts.update({_id: id}, {$set: {'title': title, 'body': body, 'tags': tags, 'published': published}});
	},
	'removePost': function(id){
		Posts.remove(id);
	},
	addComment: function(comment){
		Comments.insert(comment);
	},
	removeComment: function(id){
		Comments.remove(id);
	},
	likeComment: function(user, id, opt){
		if (opt == 1) {
			Comments.update({_id: id}, {$push: {'whoLikes': user}});
		}
		if (opt == 0) {
			Comments.update({_id: id}, {$pull: {'whoLikes': user}});
		}
	},
	dislikeComment: function(user, id, opt){
		if (opt == 1) {
			Comments.update({_id: id}, {$push: {'whoDislikes': user}});
		}
		if (opt == 0) {
			Comments.update({_id: id}, {$pull: {'whoDislikes': user}});
		}
	},
	uploadAvatar: function(image){
		Avatar.insert(image, function (err, fileObj) {
          if (!err){
            var userId = Meteor.userId();
            var imagesURL = '/cfs/files/avatar/' + fileObj._id;
            Meteor.users.update(userId, {$set: {'profile.avatar': imagesURL}});
          }
        });
        return Meteor._reload.reload();
	}
})