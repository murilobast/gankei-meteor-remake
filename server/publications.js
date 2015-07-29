Meteor.publish("freeweek",function () {
	return FreeWeek.find();
});

Meteor.publish("summoners",function () {
	return Summoners.find();
});

Meteor.publish("champions",function () {
	return Champions.find();
});

Meteor.publish("featured",function () {
	return Featured.find({}, {fields: {'participants': 1, 'gameId': 1, 'gameQueueConfigId': 1, 'platformId': 1}});
});