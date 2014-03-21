var BaseModel = require('../BaseModel');
var util = require('util');

module.exports = Player;
util.inherits(Player, BaseModel);

function Player(data, index){

	this.data = data || {'MAX_GAME_POINTS': 10,
										'resources': {
											'brick': 0,
											'wood': 0,
											'sheep': 0,
											'wheat': 0,
											'ore': 0
										},
										'oldDevCards': {
											'yearOfPlenty': 0,
											'monopoly': 0,
											'soldier': 0,
											'roadBuilding': 0,
											'monument': 0
										},
										'newDevCards': {
											'yearOfPlenty': 0,
											'monopoly': 0,
											'soldier': 0,
											'roadBuilding': 0,
											'monument': 0
										},
										'roads': 15,
										'cities': 4,
										'settlements': 5,
										'soldiers': 0,
										'victoryPoints': 0,
										'monuments': 0,
										'longestRoad': false,
										'largestArmy': false,
										'playedDevCard': false,
										'discarded': false,
										'playerID': -1,
										'orderNumber': index,
										'name': null,
										'color': null
										};

	this.MAX_GAME_POINTS = player.MAX_GAME_POINTS;
	this.resources = player.resources;

	this.oldDevCards = player.oldDevCards;

    this.newDevCards = player.newDevCards;

	this.roads = player.roads;
	this.cities = player.cities;
	this.settlements = player.settlements;
	this.soldiers = player.soldiers;
	this.victoryPoints = player.victoryPoints;
	this.monuments = player.monuments;

	this.longestRoad = player.longestRoad;
	this.largestArmy = player.largestArmy;
	this.playedDevCard = player.playedDevCard;
	this.discarded = player.discarded;

	this.playerID = player.playerID;
	this.orderNumber = player.orderNumber;

	this.name = player.name;
	this.color = player.color;
}

Player.prototype.buyDevCard = function(cardType){
	this.newDevCards[cardType]++;
}

Player.prototype.playYearOfPlenty = function(resource1, resource2){
	this.resources[resource1]++;
	this.resources[resource2]++;
	this.oldDevCards['yearOfPlenty']--;
}


Player.prototype.updateDevCards = function(){

	this.oldDevCards['yearOfPlenty'] += this.newDevCards['yearOfPlenty'];
	this.oldDevCards['monopoly'] += this.newDevCards['monopoly'];
	this.oldDevCards['monument'] += this.newDevCards['monument'];
	this.oldDevCards['soldier'] += this.newDevCards['soldier'];
	this.oldDevCards['roadBuilding'] += this.newDevCards['roadBuilding'];

	this.newDevCards['yearOfPlenty'] = 0;
	this.newDevCards['monument'] = 0;
	this.newDevCards['monopoly'] = 0;
	this.newDevCards['roadBuilding'] = 0;
	this.newDevCards['soldier'] = 0;

}

Player.prototype.addResource = function(resource, amount){
	var a = amount || 1
	this.resources[resource] += a;
}

Player.prototype.discardResource = function(resource, amount){
	var a = amount || 1
	this.resources[resource] -= a;
}

Player.prototype.discardCards = function(cardsToDiscard){
	this.resources['brick'] = this.resources['brick'] - cardsToDiscard['brick'];
	this.resources['wood'] = this.resources['wood'] - cardsToDiscard['wood'];
	this.resources['sheep'] = this.resources['sheep'] - cardsToDiscard['sheep'];
	this.resources['wheat'] = this.resources['wheat'] - cardsToDiscard['wheat'];
	this.resources['ore'] = this.resources['ore'] - cardsToDiscard['ore'];

	this.discarded = true;
}

Player.prototype.hasDiscarded = function() {
	return this.discarded;
}

Player.prototype.maritimeTrade = function(resourceToGive, ratio, resourceToGet) {
	this.resources[resourceToGive] = this.resources[resourceToGive] - ratio;
	this.resources[resourceToGet]++;
}

Player.prototype.toJSON = function(){

	return {'MAX_GAME_POINTS': this.MAX_GAME_POINTS,
			'resources': {
				'brick': this.brick,
				'wood': this.wood,
				'sheep': this.sheep,
				'wheat': this.wheat,
				'ore': this.ore
			},
			'oldDevCards': {
				'yearOfPlenty': this.yearOfPlenty,
				'monopoly': this.monopoly,
				'soldier': this.soldier,
				'roadBuilding': this.roadBuilding,
				'monument': this.monument
			},
			'newDevCards': {
				'yearOfPlenty': this.yearOfPlenty,
				'monopoly': this.monopoly,
				'soldier': this.soldier,
				'roadBuilding': this.roadBuilding,
				'monument': this.monument
			},
			'roads': this.roads,
			'cities': this.cities,
			'settlements': this.settlements,
			'soldiers': this.soldiers,
			'victoryPoints': this.victoryPoints,
			'monuments': this.monuments,
			'longestRoad': this.longestRoad,
			'largestArmy': this.largestArmy,
			'playedDevCard': this.playedDevCard,
			'discarded': this.discarded,
			'playerID': this.playerID,
			'orderNumber': this.orderNumber,
			'name': this.name,
			'color': this.color
			};

}