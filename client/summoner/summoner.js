Template.summoner.helpers({
	getTab: function (tab) {
		return Session.get('tab') == tab;
	},
	isActive: function(value) {
		if (Session.get('tab') == value) {
			return 'active';
		}
	}
});

Template.summoner.events({
	'click .content__header__selectors__selector': function (evt, tmpl) {
		Session.set('tab', evt.currentTarget.name);
	}
});

Template.overview.helpers({
	getChampions: function () {
		champions = this.champions;
		if (champions) {
			return champions.slice(0,4);
		}
	},
	// dontExist: function(){
	// 	var name = Session.get('name');
	// 	var region = Session.get('region');
	// 	var url = 'https://br.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+name+'?api_key=' + apiKey;
	// 	HTTP.get(url, function(err, summoner) {
	// 		if
	// 		console.log(summoner);
	// 	});
	// }
});

Template.summonerChampion.helpers({
	getKey: function(id){
		var champion = Champions.findOne({id: id});
		if (champion) {
			return champion.key;
		}
	},
	getName: function(id){
		var champion = Champions.findOne({id: id});
		if (champion) {
			return champion.name;
		}
	},
	getKDA: function(){
		var stats = this.stats;
		if (stats) {
			var games =stats.totalSessionsPlayed;
			var kills = parseInt(stats.totalChampionKills/games);
			var deaths = parseInt(stats.totalDeathsPerSession/games);
			var assists = parseInt(stats.totalAssists/games);
			var kda = kills+'/'+deaths+'/'+assists
			return kda
		}
	},
	getRate: function(){
		var stats = this.stats;
		if (stats) {
			var games =stats.totalSessionsPlayed;
			var wins = stats.totalSessionsWon;
			var rate = parseInt((wins/games)*100);
			return rate;
		}
	}
});