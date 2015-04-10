Template.right.helpers({
})

Template.aside.events({
	'click .content__side a': function () {
		var elements = $('.action__menu, .content__side, .dark');
		if (elements.hasClass('isOpen')){
			elements.removeClass('isOpen');
		}
	}
});

Template.right.events({
})