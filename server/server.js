getFreeweek()
getFeatured()
getChampions()

Meteor.methods({
	'getSummonerInfo': function(name, region){
		if (Summoners.findOne({name: name})){
			return Summoners.findOne({name: name});
		}else{
			url = 'https://br.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+name+'?api_key=' + apiKey;
			HTTP.get(url, function(err, summoner){
				if (summoner.statusCode == 200){
					var summoner = summoner.data[name];
					var id = summoner.id;
					url = 'https://br.api.pvp.net/api/lol/'+region+'/v2.5/league/by-summoner/'+id+'/entry?api_key='+apiKey;
					HTTP.get(url, function(err, ranked){
						if (ranked.statusCode == 200){
							ranked = ranked.data[id];
							var tier = ranked[0].tier;
							var division = ranked[0].entries[0].division;
							var leaguePoints = ranked[0].entries[0].leaguePoints;
							var data = {
								id: id,
								name: name,
								tier: tier,
								division: division,
								leaguePoints: leaguePoints
							}
							console.log(data);
							Summoners.insert(data)
							return data;
						}else{
							console.log(err);
							return err;
						}
					})
				}else{
					console.log(err);
					return err;
				}
			});
		}
	}
})