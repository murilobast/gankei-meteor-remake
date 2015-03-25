Meteor.subscribe('img');
Template.postSubmit.rendered = function() {
  var template = this;
  $('.addPost').summernote({
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