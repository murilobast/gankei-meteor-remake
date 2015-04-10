Meteor.publish("freeweek",function () {
	return FreeWeek.find();
	//return FreeWeek.find({}, {fields: {id: 1}}); pra lembrar como publica field
});
Meteor.publish("featured",function () {
	return Featured.find({}, {fields: {'participants': 1, 'gameId': 1, 'gameQueueConfigId': 1}});
	//return FreeWeek.find({}, {fields: {id: 1}}); pra lembrar como publica field
});