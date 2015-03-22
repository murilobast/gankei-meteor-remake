Template.profile.helpers({
})

Template.profile.events({
	'mouseover .profile__header': function(){
		var icon = $('.profile__header__controls__change');
		icon.css('opacity', 0.9)
	},
	'mouseout .profile__header': function(){
		var icon = $('.profile__header__controls__change');
		icon.css('opacity', 0)
	},
	'click .profile__header__controls__change': function(e, t){
		var modal = $('.profile__modal__change');
		modal.css({display: 'block', opacity: 0.9});
	},
	'click .profile__modal__change__header__close': function(){
		var modal = $('.profile__modal__change');
		modal.css({display: 'none', opacity: 0});
	},
	'click .profile__modal__change__body__save': function(e, t){
		var url = t.find('.profile__modal__change__body__input').value;
		var id = Meteor.userId();
		Meteor.call('updateUserImage', id, url);
		var modal = $('.profile__modal__change');
		modal.css({display: 'none', opacity: 0});
	}
})