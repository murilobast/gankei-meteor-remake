Meteor.subscribe('comments');

//HELPERS
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
		return Comments.find({'postId': this._id}, {sort: {date: 'desc'}, limit: 10 });
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

//EVENTS
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
			date: date,
			whoLike: []
		};
		Meteor.call('addComment', comment);
		t.find('.content__body__article__comments__add__textarea').value = '';
	}
})

Template.comment.events({
	'click .comment__footer__buttons__remove': function (e, t) {
		var id = this._id;
		Meteor.call('removeComment', id);
	},
	'click .like': function(){
		var id = this._id;
		var user = this.owner;
		var add = true;
		Meteor.call('commentLike', user, id, add);
	}
});