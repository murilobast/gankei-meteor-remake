Meteor.subscribe('img');

Template.postAdd.rendered = function() {
  //var template = this;
  $('.addPost__editor').editable({
    inlineMode: false,
    alwaysVisible: true,
    minHeight: 300
  });
};

Template.postEdit.rendered = function() {
  //ar template = this;
  $('.editPost__editor').editable({
    inlineMode: false,
    alwaysVisible: true,
    minHeight: 300,
    placeholder: ''
  });
};

Template.postAdd.events({
  'click .addPost__add': function (e, t) {
    $('.addPost__modal').css('top', '1px');
  },
  'click .addPost__modal .confirm': function (e, t) {
    var title = t.find('.addPost__field__input').value;
    var data = t.find('.froala-element').innerHTML;
    var data = data.split('<p><br></p>').join('')
    var post = {
      title: title,
      data: data,
      date: new Date()
    };
    $('.addPost__modal').css('top', '-1600px');
    Meteor.call('addPost', post);
  },
  'click .addPost__modal .cancel': function (e, t) {
    $('.addPost__modal').css('top', '-1600px');
  }
});

Template.postEdit.helpers({
  getPost: function(){
    var post = Posts.findOne(this.postId);
    $('.editPost__field__input').val(post.title);
    $('.froala-element').html(post.data);
  }
})

Template.postEdit.events({
  'click .editPost__edit': function (e, t) {
    $('.editPost__modal').css('top', '1px');
  },
  'click .editPost__modal .confirm': function (e, t) {
    var id = this.postId;
    var title = t.find('.editPost__field__input').value;
    var data = $('.editPost .note-editable').html();
    var data = data.split('<p><br></p>').join('')
    $('.editPost__modal').css('top', '-1600px');
    Meteor.call('editPost', id, title, data);
  },
  'click .editPost__modal .cancel': function (e, t) {
    $('.editPost__modal').css('top', '-1600px');
  }
});


// $('.editPost__editor').summernote({
//     height: 400,
//     maxHeight:800,
//     minHeight:250,
//     onImageUpload: function(files, editor, $editable) {
//       Images.insert(files[0], function (err, fileObj) {
//         template.autorun(function (c) {
//           fileObj = Images.findOne(fileObj._id);
//           var url = fileObj.url();
//           console.log(url);
//           if (url) {
//             editor.insertImage($editable, url);
//             c.stop();
//           }
//         });
//       });
//     }
//   });