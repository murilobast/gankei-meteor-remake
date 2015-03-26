Template.posts.helpers({
	posts: function () {
		return Posts.find({}, {sort: {date: 'desc'}, limit: 10 });
	}
});

Template.post.helpers({
	compactDate: function(){
		var date = Posts.findOne(this._id).date;
		var month = date.getUTCMonth() + 1; //months from 1-12
		var day = date.getUTCDate();
		var year = date.getUTCFullYear();
		var week = [
			"Domingo",
			"Segunda-feira",
			"Terça-feira",
			"Quarta-feira",
			"Quinta-feira",
			"Sexta-feira",
			"Sabado"
		];
		var hour = date.getHours();
		var weekday = week[date.getDay()];

		var compactDate = hour + 'h ' + weekday + ' ' + day + "/" + month + "/" + year;
		return compactDate;
	}
})

Template.post.events({
	'click .remove': function(){
		Meteor.call('removePost', this._id);
	}
});