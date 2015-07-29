Template.action.rendered = function () {

};

Template.action.helpers({

});

Template.action.events({
	'click .action__menu': function(){
		var elements = $('.action__menu, .content__side, .dark')
		elements.toggleClass('isOpen');
	},
	'click .action__searchBtn': function(){
		var elements = $('.action__searchBtn, .action__search, .action__logo__title');
		var input = $('.action__search__input');
		if (!elements.hasClass('isOpen')){
			elements.addClass('isOpen');
			input.focus()
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
	},
	'submit .action__search': function(evt){
		evt.preventDefault();
		var name = evt.target.name.value;
		var region = $('#select-server option:selected').val();
		var input = $('.action__search__input');
		var elements = $('.action__searchBtn, .action__search, .action__logo__title');
		input.blur;
		evt.target.name.value = '';
		Router.go('/summoner/'+region+'/'+name);
		elements.removeClass('isOpen');
		input.blur;
	}
});