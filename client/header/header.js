Template.header.helpers({
	name: function(){
		return Meteor.user().username;
	}
})
Template.header.events({
	'click .header__menu': function(e, t){
		side = t.find('.content__side');
		var side = $('.content__side');
		if (side.css('margin-left') == '0px'){
			side.css('margin-left', '-230px');
		}else{
			side.css('margin-left', '0px');
		}
	},
	'click .header__profile__settings': function(){
		Meteor.logout();
	}
})