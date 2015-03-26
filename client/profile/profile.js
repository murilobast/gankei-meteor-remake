Meteor.subscribe('avatar');

//RENDER
Template.crop.rendered = function () {
};

//HELPERS
Template.profile.helpers({
	avatar: function(){
		return Meteor.user().profile.avatar || '/avatar/default.png';
	}
})
Template.crop.helpers({
	avatar: function(){
		return Meteor.user().profile.avatar || '/avatar/default.png';
	}
})

//EVENTS
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
	'click .profile__header__avatar__edit': function(){
		var modal = $('.profile__modal__avatar');
		modal.css('top', '1px');
	}
})

Template.crop.events({
	'change .profile__modal__avatar__body__upload': function (e, t) {
		$('.profile__modal__avatar__body__crop > img').cropper('destroy');
		var image = t.find('.profile__modal__avatar__body__upload').files[0];
		var target = $('.profile__modal__avatar__body__crop__img');
		if (image){
			var reader = new FileReader();
			reader.onload = function(e) {
				// $('.cropper-canvas > img').attr('src',e.target.result);
				// $('.cropper-view-box > img').attr('src',e.target.result);
				target.attr('src',e.target.result);
			}
			reader.readAsDataURL(image);
		}
		//setTimeout(function(){
		$('.profile__modal__avatar__body__crop > img').cropper({
			aspectRatio: 1 / 1,
			autoCropArea: 1,
			strict: false,
			guides: true,
			highlight: true,
			dragCrop: false,
			movable: true,
			resizable: true
		})
		//}, 1000);
	},
	'click .profile__modal__avatar__body__btn__save': function(e, t){
		var image = $('.profile__modal__avatar__body__crop > img').cropper('getCroppedCanvas').toDataURL();
		Meteor.call('uploadAvatar', image);
		$('.profile__modal__avatar').css('top', '-3000px');
		$('.profile__modal__avatar__body__crop > img').cropper('destroy');
	},
	'click .profile__modal__avatar__body__btn__cancel': function(){
		$('.profile__modal__avatar').css('top', '-3000px');
		$('.profile__modal__avatar__body__crop > img').cropper('destroy');
	}
});
// Images.insert(files[0], function (err, fileObj) {
//           fileObj = Images.findOne(fileObj._id);
//           var url = fileObj.url();
//           console.log(url);
//           if (url) {
//             editor.insertImage($editable, url);
//             c.stop();
//           }
//         });