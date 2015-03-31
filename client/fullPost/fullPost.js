Meteor.subscribe('comments');
//RENDERED
Template.fullPost.rendered = function () {
	document.title = Session.get('title') + ' · Gankei';
};
Template.comment.rendered = function () {
};
//HELPERS
Template.fullPost.helpers({
	avatar: function(){
		return Meteor.user().profile.avatar;
	},
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
	likeCount: function(){
		var id = this._id;
		var likes = Comments.findOne(id).whoLikes.length;
		var dislikes = Comments.findOne(id).whoDislikes.length;
		var display = $('.comment__footer__like .value');
		var value = likes - dislikes;
		//value == 0 ? display.css('color', '#37474f') : value < 0 ? display.css('color', '#ff5252') : display.css('color', '#009688');
		value = value <= 0 ? value : '+' + value;
		return value;
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
		e.preventDefault();
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
			opt = 0;
			Meteor.call('dislikeComment', user, id, opt);
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
			opt = 0;
			Meteor.call('likeComment', user, id, opt);
		}
	}
});