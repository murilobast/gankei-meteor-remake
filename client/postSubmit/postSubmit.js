Meteor.subscribe('img');

Template.postSubmit.rendered = function() {
  var template = this;
  $('.addPost__editor').summernote({
    height: 400,
    maxHeight:800,
    minHeight:250,
    onImageUpload: function(files, editor, $editable) {
      Images.insert(files[0], function (err, fileObj) {
        template.autorun(function (c) {
          fileObj = Images.findOne(fileObj._id);
          var url = fileObj.url();
          console.log(url);
          if (url) {
            editor.insertImage($editable, url);
            c.stop();
          }
        });
      });
    }
  });
};

Template.postEdit.rendered = function() {
  var template = this;
  $('.editPost__editor').summernote({
    height: 400,
    maxHeight:800,
    minHeight:250,
    onImageUpload: function(files, editor, $editable) {
      Images.insert(files[0], function (err, fileObj) {
        template.autorun(function (c) {
          fileObj = Images.findOne(fileObj._id);
          var url = fileObj.url();
          console.log(url);
          if (url) {
            editor.insertImage($editable, url);
            c.stop();
          }
        });
      });
    }
  });
};

Template.postSubmit.events({
  'click .addPost__add': function (e, t) {
    $('.addPost__modal').css('top', '1px');
  },
  'click .addPost__modal .confirm': function (e, t) {
    var title = t.find('.addPost__field__input').value;
    var data = t.find('.note-editable').innerHTML;
    var data = data.split('<p><br></p>').join('')
    var post = {
      title: title,
      data: data,
      date: new Date()
    };
    $('.addPost__modal').css('top', '-1600px');
    Meteor.call('addPost', post);
  }
});

Template.postEdit.helpers({
  getPost: function(){
    var post = Posts.findOne(this.postId);
    $('.editPost__field__input').val(post.title);
    $('.editPost .note-editable').html(post.data);
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
  }
});