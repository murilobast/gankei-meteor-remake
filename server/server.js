// getFreeweek()
// getFeatured()
// getChampions()
insertSummoner = function(summoner, solo, team3, team5, summary, champions) {
	console.log("was called");
	var id = summoner.id;
	var level = summoner.summonerLevel;
	var icon = summoner.profileIconId;
	var revision = summoner.revisionDate;
	var fullName = summoner.name;
	var data = {
		id: id,
		region: region,
		name: name,
		fullName: fullName,
		icon: icon,
		level: level,
		revision: revision,
		solo: solo,
		team5: team5,
		team3: team3,
		summary: summary,
		champions: championArray
	}
	Summoners.remove({name: name});
	Summoners.insert(data);
	console.log('-------------------');
	console.log("");
	console.log('-------------------');
}

Meteor.methods({
	'getSummonerInfo': function(name, region){
		if (!Summoners.findOne({name: name})){
			url = 'https://br.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+name+'?api_key=' + apiKey;
			HTTP.get(url, function(err, summoner){
				if (summoner.statusCode == 200){
					var summoner = summoner.data[name];
					var id = summoner.id;
					var level = summoner.summonerLevel;
					var icon = summoner.profileIconId;
					var revision = summoner.revisionDate;
					var fullName = summoner.name;
					url = 'https://br.api.pvp.net/api/lol/'+region+'/v2.5/league/by-summoner/'+id+'/entry?api_key='+apiKey;
					HTTP.get(url, function(err, ranked){
						if (ranked.statusCode == 200){
							ranked = ranked.data[id];
							var solo = team5 = team3 = {
									name: 'unranked',
									tier: 'unranked',
									division: '',
									lp: 0,
									wins: 0,
									losses: 0,
									inactive: false
								};
							if (ranked[0]){
								var rankedData = ranked[0];
								solo ={
									name: rankedData.name,
									tier: rankedData.tier,
									division: rankedData.entries[0].division,
									lp: rankedData.entries[0].leaguePoints,
									wins: rankedData.entries[0].wins,
									losses: rankedData.entries[0].losses,
									inactive: rankedData.entries[0].isInactive
								}
							}
							var team5;
							if (ranked[1]){
								var rankedData = ranked[1];
								team5 ={
									name: rankedData.name,
									tier: rankedData.tier,
									division: rankedData.entries[0].division,
									lp: rankedData.entries[0].leaguePoints,
									wins: rankedData.entries[0].wins,
									losses: rankedData.entries[0].losses,
									inactive: rankedData.entries[0].isInactive
								}
							}
							var team3;
							if (ranked[2]){
								var rankedData = ranked[2];
								team3 ={
									name: rankedData.name,
									tier: rankedData.tier,
									division: rankedData.entries[0].division,
									lp: rankedData.entries[0].leaguePoints,
									wins: rankedData.entries[0].wins,
									losses: rankedData.entries[0].losses,
									inactive: rankedData.entries[0].isInactive
								}
							}
							url = 'https://br.api.pvp.net/api/lol/'+region+'/v1.3/stats/by-summoner/'+id+'/ranked?season=SEASON2015&api_key=' + apiKey;
							HTTP.get(url, function(err, summary){
								if (summary.statusCode == 200){
									var champions = summary.data.champions;
									var championArray = [];
									for (champion in champions ){
										var champ = champions[champion];
										if (!champ.id == 0) {
											championArray.push(champ);
										}else{
											summary = champ.stats;
										}
									}
									championArray.sort(function(obj1, obj2) {
										return obj2.stats.totalSessionsPlayed - obj1.stats.totalSessionsPlayed;
									});
									insertSummoner(summoner, solo, team3, team5, summary, champions);
									return data;
								}else{
									var summary = championArray = [];
									insertSummoner(summoner, solo, team3, team5, summary, championArray);
									console.log("COULD NOT FIND CHAMPIONS INFO! SUMMONER "+name+" - REGION "+region+", GOT "+summary.statusCode);
								}
							})
						}else{
							var summary = solo = team3 = team5 = championArray = [];
							insertSummoner(summoner, solo, team3, team5, summary, championArray);
							console.log("COULD NOT FIND RANKED INFO! SUMMONER "+name+" - REGION "+region+", GOT "+ranked.statusCode);
						}
					})
				}else{
					console.log("COULD NOT FIND SUMMONER "+name+" - REGION "+region+", GOT "+summoner.statusCode);
				}
			});
		}
	}
})