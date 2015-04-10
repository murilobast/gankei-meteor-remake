Template.action.rendered = function () {
};

Template.action.helpers({

})
Template.action.events({
	'click .action__menu': function(){
		var elements = $('.action__menu, .content__side, .dark')
		elements.toggleClass('isOpen');
	},
	'click .action__searchBtn': function(){
		var elements = $('.action__searchBtn, .action__search, .action__logo__title');
		if (!elements.hasClass('isOpen')){
			elements.addClass('isOpen');
		}
	},
	'blur .action__search__input': function(){
		var input = $('.action__search__input');
		if (input.val() == ""){
			input.removeClass('isOpen');
		}
	},
	'click .close': function(){
		var elements = $('.action__searchBtn, .action__search, .action__logo__title');
		elements.removeClass('isOpen');
	}
})