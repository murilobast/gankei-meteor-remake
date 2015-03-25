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