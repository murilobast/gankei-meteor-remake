Template.header.rendered = function () {
	$(function(){
		var addShadow = 10;
		$(window).scroll(function() {
			var scroll = getCurrentScroll();
			if ( scroll >= addShadow ) {
				$('.header').addClass('shadow');
			}else {
				$('.header').removeClass('shadow');
			}
		});
		function getCurrentScroll() {
			return window.pageYOffset;
		}
	});
};

Template.header.helpers({
	username: function(){
		return Meteor.user().username;
	},
	avatar: function(){
		return Meteor.user().profile.avatar;
	}
})
Template.header.events({
	'click .header__menu': function(){
		var side = $('.content__side');
		var right = $('.content__right');
		if (side.css('margin-left') == '0px'){
			side.css('margin-left', '-230px');
		}else{
			side.css('margin-left', '0px');
		}
		$('.header__menu').toggleClass('isOpen');
		if ($(window).width() < 1051){
			right.css('margin-right', '-230px');
		}
	},
	'click .header__profile__avatar': function(){
		var side = $('.content__side');
		var right = $('.content__right');
		var menu = $('.header__menu');
		if (right.css('margin-right') == '-230px'){
			right.css('margin-right', '0px');
		}else{
			right.css('margin-right', '-230px');
		}
		if ($(window).width() < 1051){
			side.css('margin-left', '-230px');
			if (menu.hasClass('isOpen')){
				menu.removeClass('isOpen');
			}
		}
	},
	'click .header__profile__login': function(){
		var side = $('.content__side');
		var right = $('.content__right');
		var menu = $('.header__menu');
		var body = $('.content__body');
		if (right.css('margin-right') == '-230px'){
			right.css('margin-right', '0px');
		}else{
			right.css('margin-right', '-230px');
		}
		if ($(window).width() < 1051){
			side.css('margin-left', '-230px');
			body.css('left', '0px');
			if (menu.hasClass('isOpen')){
				menu.removeClass('isOpen');
			}
		}
	}
})