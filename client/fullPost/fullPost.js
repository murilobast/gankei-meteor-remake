Meteor.subscribe('comments');

Template.fullPost.helpers({
	postData: function(){
		return Posts.find(this.postId);
	},
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
	},
	comments: function(){
		console.log(this._id);
		return Comments.find({'postId': this._id});
	}
})
Template.comment.helpers({
	user: function(){
		var user = Meteor.users.find(this.owner);
		return user;
	},
	owner: function(){
		return Meteor.userId() == this.owner; //|| is admin
	}
})

Template.fullPost.events({
	'click .content__body__article__comments__add__btn': function(e, t){
		var owner = Meteor.userId();
		var postId = this._id;
		var body = t.find('.content__body__article__comments__add__textarea').value;
		var date = new Date();
		var comment = {
			owner: owner,
			postId: postId,
			body: body,
			date: date
		};
		Meteor.call('addComment', comment);
	}
})