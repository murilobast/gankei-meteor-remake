Meteor.subscribe('comments');
//RENDERED
Template.fullPost.rendered = function () {
	document.title = Session.get('title') + ' · Gankei';
};
Template.comment.rendered = function () {
	
};
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
	},
	likes: function(){
		var id = this._id;
		var likes = Comments.findOne(id).whoLikes;
		return likes.length;
	},
	dislikes: function(){
		var id = this._id;
		var dislikes = Comments.findOne(id).whoDislikes;
		return dislikes.length;
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
			whoLikes: [],
			whoDislikes: []
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
		var owner = this.owner;
		var user = Meteor.userId();
		var likes = Comments.findOne(id).whoLikes;
		if (likes.indexOf(user) > -1){
			var opt = 0;
			Meteor.call('likeComment', user, id, opt);
		}else{
			var opt = 1;
			Meteor.call('likeComment', user, id, opt);
		}
	},
	'click .dislike': function(){
		var id = this._id;
		var owner = this.owner;
		var user = Meteor.userId();
		var likes = Comments.findOne(id).whoDislikes;
		if (likes.indexOf(user) > -1){
			var opt = 0;
			Meteor.call('dislikeComment', user, id, opt);
		}else{
			var opt = 1;
			Meteor.call('dislikeComment', user, id, opt);
		}
	}
});