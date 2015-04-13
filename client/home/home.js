Template.home.helpers({
	getFreeweek: function(){
		var freeweek = FreeWeek.find();
		return freeweek;
	},
	getFeatureds: function(){
		var featured = Featured.find();
		Session.set('featured', Featured.findOne());
		return featured;
	}
})

Template.home.events({
	'click .dot': function(evt, tmpl){
		Session.set('featured', this);
	}
});

Template.featured.helpers({
	getType: function(type){
		configId = {
			02: 'NORMAL',
			14: 'DRAFT',
			04: 'RANKED SOLO',
			41: 'RANKED TEAM 3X3',
			42: 'RANKED TEAM 5X5',
			65: 'ARAM'
		};
		return configId[type];
	},
	getBlueTeam: function(participants){
		blueTeam = [];
		participants.forEach(function (participant, index) {
			if (participant.teamId == 100){
				blueTeam.push(participant);
			};
		});
		return blueTeam;
	},
	getPurpleTeam: function(participants){
		purpleTeam = [];
		participants.forEach(function (participant, index) {
			if (participant.teamId == 200){
				purpleTeam.push(participant);
			}
		});
		return purpleTeam;
	},
	getKey: function(id){
		if (Champions.findOne({id: id})){
			var key = Champions.findOne({id: id}).key;
			return key;
		}
	},
	getFeatured: function(){
		var featured = Session.get('featured');
		return featured;
	}
})