Template.aside.events({
	'click .content__side a': function () {
		if ($('.content').width() < 1200){
			var side = $('.content__side');
			side.css('margin-left', '-230px');
		}
	}
});