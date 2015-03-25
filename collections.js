FreeWeek = new Mongo.Collection('freweek');
Posts = new Mongo.Collection('posts');
Images = new FS.Collection("images", {
	stores: [new FS.Store.FileSystem("images", {path: "/images"})]
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