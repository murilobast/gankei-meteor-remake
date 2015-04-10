Meteor.subscribe('img');

Template.postAdd.rendered = function() {
  $select = $('.addPost__tags, .addPost__tags').selectize({
      plugins: ['restore_on_backspace'],
      delimiter: ',',
      persist: false,
      create: function(input) {
          return {
              value: input,
              text: input
          }
      }
  }); 
  $('.addPost__editor').editable({
    inlineMode: false,
    alwaysVisible: true,
    minHeight: 250,
    maxHeight: 400
  });
};

Template.postEdit.rendered = function() {
  $select = $('.editPost__tags, .addPost__tags').selectize({
      plugins: ['restore_on_backspace'],
      delimiter: ',',
      persist: false,
      create: function(input) {
          return {
              value: input,
              text: input
          }
      }
  }); 
  $('.editPost__editor').editable({
    inlineMode: false,
    alwaysVisible: true,
    minHeight: 250,
    maxHeight: 400,
    placeholder: ''
  });
};

Template.postAdd.events({
  'click .addPost__add': function (e, t) {
    $('.addPost__modal').css('top', '1px');
  },
  'click .addPost__modal .confirm': function (e, t) {
    var title = t.find('.addPost__field__input').value;
    $('.froala-element *').removeAttr('style');
    var body = t.find('.froala-element').innerHTML;
    var body = body.split('<p><br></p>').join('');
    var tags = $('.addPost__tags').selectize()[0].selectize.getValue().split(',');
    var published = $('#published').is(':checked');
    var post = {
      title: title,
      body: body,
      date: new Date(),
      tags: tags,
      published: published,
      whoLikes: [],
      whoDislikes: []
    };
    $('.addPost__modal').css('top', '-1600px');
    Meteor.call('addPost', post);
    Router.go('/');
  },
  'click .addPost__modal .cancel': function (e, t) {
    $('.addPost__modal').css('top', '-1600px');
  }
});

Template.postEdit.helpers({
  getPost: function(){
    var post = Posts.findOne(this.postId);
    $('.editPost__field__input').val(post.title);
    $('.froala-element').html(post.body);
    $('.froala-element *').removeAttr('style');
    $('.checkbox__checkbox').prop('checked', post.published);
    var tags = post.tags;
    tags.forEach(function(tag){
      $select[0].selectize.createItem(tag);
    })
  }
})

Template.postEdit.events({
  'click .editPost__edit': function (e, t) {
    $('.editPost__modal').css('top', '1px');
  },
  'click .editPost__modal .confirm': function (e, t) {
    var id = this.postId;
    var title = t.find('.editPost__field__input').value;
    $('.froala-element *').removeAttr('style');
    var body = $('.froala-element').html();
    var body = body.split('<p><br></p>').join('')
    var tags = $('.editPost__tags').selectize()[0].selectize.getValue().split(',');
    var published = $('#published').is(':checked');
    $('.editPost__modal').css('top', '-1600px');
    Meteor.call('editPost', id, title, body, tags, published);
    Router.go('/');
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
