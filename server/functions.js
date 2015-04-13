apiKey = '5460904e-6a46-40d8-a996-baa2a8af5526';

getFreeweek = function(){
	url = 'https://br.api.pvp.net/api/lol/br/v1.2/champion?freeToPlay=true&api_key=' + apiKey;
	var freeweek = HTTP.get(url);
	if(freeweek.statusCode == 200){
		FreeWeek.remove({});
		var freeweekArray = freeweek.data.champions;
		freeweekArray.forEach(function (champion) {
			id = champion.id;
			url = 'https://global.api.pvp.net/api/lol/static-data/br/v1.2/champion/'+id+'?api_key=' + apiKey;
			var getName = HTTP.get(url);
			var name = getName.data.name;
			var title = getName.data.title;
			var key = getName.data.key;
			var insertChampion = {
				id: id,
				name: name,
				title: title,
				key: key
			}
			console.log("INSERTING CHAMPION "+key+' INTO FREEWEEK DB');
			FreeWeek.insert(insertChampion);
		});
	}
}

getFeatured = function(){
	url = 'https://br.api.pvp.net/observer-mode/rest/featured?api_key=' + apiKey;
	var featured = HTTP.get(url);
	if(featured.statusCode == 200){
		Featured.remove({});
		var featuredArray = featured.data.gameList;
		featuredArray.forEach(function (game) {
			gameId = game.gameId;
			console.log("INSERTING GAME "+gameId+' INTO FEATURED GAMES DB');
			Featured.insert(game);
		});
	}
}

getChampions = function(){
	url = 'https://global.api.pvp.net/api/lol/static-data/br/v1.2/champion?api_key=' + apiKey;
	var featured = HTTP.get(url, function(err, champions){
		if(champions.statusCode == 200){
			Champions.remove({});
			var championData = champions.data.data;
			Object.keys(championData).forEach(function (champion) {
				var champion = championData[champion];
				console.log("INSERTING "+champion.name+" INTO CHAMPIONS COLLECTION");
				Champions.insert(champion);
			});
		}
	});
}