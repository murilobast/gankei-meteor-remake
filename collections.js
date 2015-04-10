FreeWeek = new Mongo.Collection('freweek');
Posts = new Mongo.Collection('posts');
Comments = new Mongo.Collection('comments');
Images = new FS.Collection("images", {
	stores: [new FS.Store.FileSystem("images")]
});
Avatar = new FS.Collection("avatar", {
	stores: [new FS.Store.FileSystem("avatar")]
});

Images.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	},
	download: function() {
		return true;
	}
});