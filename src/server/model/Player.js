var BaseModel = require('./BaseModel');
var util = require('util');
var CatanError = require('../../common').Errors.CatanError;

module.exports = Player;
util.inherits(Player, BaseModel);

function Player(input, index){
	var required = ['name','playerID','color'];
	if(!input)
		throw new CatanError('Must have at least this properties: '+required.join(','));
	required.forEach(function(s){
		if(!input[s] && input[s]!==0)
			throw new CatanError('Missing '+s);
	});
	this.playerID = input.playerID;
	this.name = input.name;
	this.color = input.color;

	this.MAX_GAME_POINTS = input.MAX_GAME_POINTS || 10;
	this.resources = input.resources || {
		'brick': 0,
		'wood': 0,
		'sheep': 0,
		'wheat': 0,
		'ore': 0
	};
	this.oldDevCards = input.oldDevCards || {
		'yearOfPlenty': 0,
		'monopoly': 0,
		'soldier': 0,
		'roadBuilding': 0,
		'monument': 0
	};
	this.newDevCards = input.newDevCards || {
		'yearOfPlenty': 0,
		'monopoly': 0,
		'soldier': 0,
		'roadBuilding': 0,
		'monument': 0
	};
	this.roads = input.roads || 15;
	this.cities = input.cities || 4;
	this.settlements = input.settlements || 5;
	this.soldiers = input.soldiers || 0;
	this.victoryPoints = input.victoryPoints || 0;
	this.monuments = input.monuments || 0;
	this.longestRoad = input.longestRoad || false;
	this.largestArmy = input.largestArmy || false;
	this.playedDevCard = input.playedDevCard || false;
	this.discarded = input.discarded || false;
	this.orderNumber = input.orderNumber || index;
}

Player.prototype.buyDevCard = function(cardType){
	this.resources['sheep']--;
	this.resources['wheat']--;
	this.resources['ore']--;

	this.newDevCards[cardType]++;
}

Player.prototype.buildRoad = function(free) {
	if (!free) {
		this.resources['brick']--;
		this.resources['wood']--;
	}

	this.roads--;
}

Player.prototype.getNumberOfRoadsBuilt = function() {
	return 15 - this.roads;
}

Player.prototype.hasLongestRoad = function() {
	return this.longestRoad;
}

Player.prototype.setLongestRoad = function(longestRoad) {
	this.longestRoad = longestRoad;

	if (this.longestRoad)
		this.victoryPoints += 2;
	else
		this.victoryPoints -= 2;
}

Player.prototype.hasLargestArmy = function() {
	return this.largestArmy;
}

Player.prototype.buildSettlement = function(free) {
	if (!free) {
		this.resources['brick']--;
		this.resources['wood']--;
		this.resources['sheep']--;
		this.resources['wheat']--;
	}

	this.settlements--;
	this.victoryPoints++;
}

Player.prototype.buildCity = function(free) {
	if (!free) {
		this.resources['wheat'] -= 2;
		this.resources['ore'] -= 3;
	}

	this.settlements++;
	this.cities--;
	this.victoryPoints++;
}

Player.prototype.playYearOfPlenty = function(resource1, resource2){
	this.resources[resource1]++;
	this.resources[resource2]++;
	this.oldDevCards['yearOfPlenty']--;
}

Player.prototype.playRoadBuilding = function(){
	this.roads -= 2;
	this.oldDevCards['roadBuilding']--;
}

Player.prototype.finishTurn = function() {
	this.updateDevCards();
	this.playedDevCard = false;
	this.discarded = false;
}

Player.prototype.getResource = function(resource) {
	return this.resources[resource];
}

Player.prototype.setResource = function(resource, amount) {
	this.resources[resource] = amount;
}

Player.prototype.playMonument = function() {
	this.victoryPoints++;
	this.monuments++;

	//Note: I don't set this.playedDevCard to true since I'm assuming that behavior
	//is different for monument cards, particularly since they can only be played if
	//the player can win.

	if (this.newDevCards['monument'] > 0)
		this.newDevCards['monument']--;
	else
		this.oldDevCards['monument']--;
}

Player.prototype.playSoldier = function(stolenCard) {
	this.resources[stolenCard]++;
	this.oldDevCards['soldier']--;
	this.soldiers++;
}

Player.prototype.loseCard = function() {
	var type = getRandomInt(0, 4);

	while (this.resources[type] == 0)
	{
		type = getRandomInt(0, 4);
	}

	this.resources[type]--;
	
	return this.resources[type].name;
}

Player.prototype.hasWon = function() {
	if (this.victoryPoints >= this.MAX_GAME_POINTS)
		return true;
	else
		return false;
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

Player.prototype.setLargestArmy = function(largestArmy) {
	this.largestArmy = largestArmy;

	if (largestArmy)
		this.victoryPoints += 2;
	else
		this.victoryPoints -= 2;
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