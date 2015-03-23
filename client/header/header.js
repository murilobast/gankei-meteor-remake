Template.header.helpers({
	username: function(){
		return Meteor.user().username;
	}
})
Template.header.events({
	'click .header__menu': function(){
		var side = $('.content__side');
		if (side.css('margin-left') == '0px'){
			side.css('margin-left', '-230px');
		}else{
			side.css('margin-left', '0px');
		}
	},
	'click .header__modal__links__logout': function(){
		Meteor.logout();
	},
	'click .header__profile__avatar': function(){
		var modal = $('.header__modal');
		if (modal.css('height') == '90px'){
			modal.css('height', '0px');
		}else{
			modal.css('height', '90px');
		}
	},
	'click .header__profile__login': function(){
		var modal = $('.header__modal');
		if (modal.css('height') == '144px'){
			modal.css('height', '0px');
		}else{
			modal.css('height', '144px');
		}
	}
})
Template.body.events({
	'click a': function(){
		var modal = $('.header__modal');
		modal.css('height', '0px');
	},
	'click button': function(){
		var modal = $('.header__modal');
		modal.css('height', '0px');
	}
})