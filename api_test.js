Db = new Mongo.Collection('get');
if (Meteor.isClient) {
  Template.body.helpers({
    summoners: function(){
      return Db.find(Session.get('id'));
    }
  });
  Template.body.events({
    'submit .form': function(event){
      var name = event.target.name.value;
      if(Db.find({name: name}).fetch()[0] != undefined){
        var id = Db.find({name: name}).fetch()[0]._id;
        Session.set('id', id);
      }else{
        Meteor.call('createSummoner', name);
        var id = Db.find({name: name}).fetch()[0]._id;
        Session.set('id', id);
      }
      console.log(id);
      event.target.name.value = '';
      return false;
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
  Meteor.methods({
    createSummoner: function(name){
      var url = 'https://br.api.pvp.net/api/lol/br/v1.4/summoner/by-name/' + name + '?api_key=a0797630-9996-4ab6-85d6-704029984adf';
      Meteor.http.get(url, function(err, obj){
        var obj = JSON.parse(obj.content)[name];
        var id = JSON.stringify(obj.id);
        var fullName = obj.name;
        var profileIcon = obj.profileIconId;
        var level = obj.level;
        var summoner = {_id: id,
          name: name,
          fullName: fullName,
          profileIcon: profileIcon,
          summonerLevel: level
        };
        Db.insert(summoner);
      });
    }
  })
}
