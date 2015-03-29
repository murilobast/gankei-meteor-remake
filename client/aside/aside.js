Template.right.helpers({
	username: function(){
		return Meteor.user().username;
	}
})
Template.aside.rendered = function () {
	// side = $('.content__side');
	// menu = $('.header__menu');
	// if (side.css('margin-left') == '0px'){
	// 	menu.addClass('isOpen');
	// }else{
	// 	menu.removeClass('isOpen');
	// }
};
Template.aside.events({
	'click .content__side a': function () {
		if ($('.content').width() < 1050){
			var side = $('.content__side');
			side.css('margin-left', '-230px');
		}
	}
});

Template.right.events({
	'click .content__side__links__link__logout': function(){
		Meteor.logout();
	},
})