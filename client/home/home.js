Template.home.helpers({
	getFreeweek: function(){
		var freeweek = FreeWeek.find();
		return freeweek;
	},
	getFeatureds: function(){
		var featured = Featured.find();
		Session.set('featured', Featured.findOne());
		return featured;
	},
	isActive: function(){
		if (this && Session.get('featured')){
			if (this.gameId == Session.get('featured').gameId){
				return "active"
			}
		}
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
		if (participants){
			participants.forEach(function (participant, index) {
				if (participant.teamId == 100){
					blueTeam.push(participant);
				};
			});
		}
		return blueTeam;
	},
	getPurpleTeam: function(participants){
		purpleTeam = [];
		if (participants){
			participants.forEach(function (participant, index) {
				if (participant.teamId == 200){
					purpleTeam.push(participant);
				}
			});
		}
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
	},
	getRankedInfo: function(){
		if (this.summonerName){
			var name = this.summonerName.replace(/ /g, '').toLowerCase();
			var region = Session.get('featured').platformId;
			var summoner; 
			if (Summoners.findOne({name: name})){
				summoner = Summoners.findOne({name: name});
				if (summoner.solo){
					var string = summoner.solo.tier+' ';
					string += summoner.solo.division+' ';
					string += ' - '+summoner.solo.lp+'LP';
					return string;
				}else{
					return 'UNRANKED';
				}
			}else{
				// Meteor.call('getSummonerInfo', name, region);
			}
		}
	},
	name: function(){
		return this.summonerName.replace(/ /g, '').toLowerCase();
	}
})