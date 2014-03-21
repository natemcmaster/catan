var BaseModel = require('./BaseModel');
var util = require('util');

module.exports = GameModel;
util.inherits(GameModel, BaseModel);

/** 
 * This is the server model class
 
 * @class GameModel
 * @constructor
 * @param {data} playerID The id of the local player, extracted from the cookie
 */
function GameModel(data, $Log, $Chat, $Bank, $Deck, $Map, $Player, $TurnTracker) {

	if(!data)
		throw new Error('Cannot instantiate without data');

	this.data = data

	this.bank = $Bank(this.data.bank);
	this.deck = $Deck(this.data.deck);
	this.map = $Map(this.data.map);
	this.log = $Log(data.log);
	this.chat = $Chat(data.chat);
	this.turnTracker = $TurnTracker(this.data.turnTracker);

	this.players = [];
	for (var i = 0; i < 4; i++) {
		this.players.push($Player(this.data.players[i], i));
	}



};

GameModel.prototype.sendChat = function(playerIndex, message) {
	this.chat.sendChat(playerIndex, message);
};

GameModel.prototype.rollNumber = function(playerIndex, number) {
	//Map
	//Players
	//Bank
	//TurnTracker
};

GameModel.prototype.robPlayer = function(playerIndex, victimIndex, location) {
	//TurnTracker
	//Players
	//Map
};

GameModel.prototype.finishTurn = function(playerIndex) {
	this.turnTracker.finishTurn();
	this.players[playerIndex].finishTurn();

	//Resources at the end of setup?
};

GameModel.prototype.buyDevCard = function(playerIndex) {
	var card = this.deck.drawRandomCard();
	this.players[playerIndex].buyDevCard(card);
	this.bank.devCardWasBought();
};

GameModel.prototype.playYearOfPlenty = function(playerIndex, resource1, resource2) {
	this.bank.withdraw(resource1);
	this.bank.withdraw(resource2);

	players[playerIndex].playYearOfPlenty(resource1, resource2);
};

GameModel.prototype.playRoadBuilding = function(playerIndex, spot1, spot2) {
	this.players[playerIndex].playRoadBuilding();
	
	var playerWithLongestRoad = this.data.longestRoad;

	//If no one has the longest road and the player who just built has 5 or more roads,
	//that player claims the longest road
	if (playerWithLongestRoad == -1 && this.players[playerIndex].getNumberOfRoadsBuilt() >= 5) {
		this.data.longestRoad = playerIndex;
		this.players[playerIndex].setLongestRoad(true);
	}

	//If the player who built did not have the longest road, but has now beaten the current
	//owner of the longest road, that player now claims the longest road
	else if (playerIndex != playerWithLongestRoad && 
			this.players[playerIndex].getNumberOfRoadsBuilt() > this.players[playerWithLongestRoad].getNumberOfRoadsBuilt()) {
		this.data.longestRoad = playerIndex;
		this.players[playerWithLongestRoad].setLongestRoad(false);
		this.players[playerIndex].setLongestRoad(true);
	}

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

	//STILL NEED TO CHANGE THE MAP
};

GameModel.prototype.playSoldier = function(playerIndex, victimIndex, location) {
	var stolenCard = this.players[victimIndex].loseCard();
	this.players[playerIndex].playSoldier(stolenCard);

	var playerWithLargestArmy = this.data.largestArmy;

	//If no one has the longest road and the player who just built has 5 or more roads,
	//that player claims the longest road
	if (playerWithLargestArmy == -1 && this.players[playerIndex].getSizeOfArmy() >= 3) {
		this.data.largestArmy = playerIndex;
		this.players[playerIndex].setLargestArmy(true);
	}

	//If the player who built did not have the longest road, but has now beaten the current
	//owner of the longest road, that player now claims the longest road
	else if (playerIndex != playerWithLargestArmy && 
			this.players[playerIndex].getSizeOfArmy() > this.players[playerWithLargestArmy].getSizeOfArmy()) {
		this.data.largestArmy = playerIndex;
		this.players[playerWithLargestArmy].setLargestArmy(false);
		this.players[playerIndex].setLargestArmy(true);
	}

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

	//STILL NEED TO CHANGE THE MAP
};

GameModel.prototype.playMonopoly = function(playerIndex, resource) {
	var totalNumberOfResource = 0;

	this.players.forEach(function(player) {
		totalNumberOfResource += player.getResource(resource);
		player.setResource(resource, 0);
	});

	this.players[playerIndex].setResource(resource, totalNumberOfResource);
};

GameModel.prototype.playMonument = function(playerIndex) {
	this.players[playerIndex].playMonument();

	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;
};

GameModel.prototype.buildRoad = function(playerIndex, roadLocation, free) {
	if (!free)
		this.bank.roadWasBuilt();
	
	this.players[playerIndex].buildRoad(free);

	var playerWithLongestRoad = this.data.longestRoad;

	//If no one has the longest road and the player who just built has 5 or more roads,
	//that player claims the longest road
	if (playerWithLongestRoad == -1 && this.players[playerIndex].getNumberOfRoadsBuilt() >= 5) {
		this.data.longestRoad = playerIndex;
		this.players[playerIndex].setLongestRoad(true);
	}

	//If the player who built did not have the longest road, but has now beaten the current
	//owner of the longest road, that player now claims the longest road
	else if (playerIndex != playerWithLongestRoad && 
			this.players[playerIndex].getNumberOfRoadsBuilt() > this.players[playerWithLongestRoad].getNumberOfRoadsBuilt()) {
		this.data.longestRoad = playerIndex;
		this.players[playerWithLongestRoad].setLongestRoad(false);
		this.players[playerIndex].setLongestRoad(true);
	}

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;
		
	//STILL NEED TO CHANGE THE MAP
};

GameModel.prototype.buildSettlement = function(playerIndex, vertexLocation, free) {
	if (!free)
		this.bank.settlementWasBuilt();
	
	this.players[playerIndex].buildSettlement(free);

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

	//STILL NEED TO CHANGE THE MAP
};

GameModel.prototype.buildCity = function(playerIndex, vertexLocation, free) {
	if (!free)
		this.bank.cityWasBuilt();

	this.players[playerIndex].buildCity(free);

	//Check if the player who built has won
	if (this.players[playerIndex].hasWon())
		this.data.winner = playerIndex;

	//STILL NEED TO CHANGE THE MAP
};

GameModel.prototype.offerTrade = function(playerIndex, offer, receiver) {
	//ASK NATE
};

GameModel.prototype.acceptTrade = function(playerIndex, willAccept) {
	//ASK NATE
};

GameModel.prototype.maritimeTrade = function(playerIndex, ratio, inputResource, outputResource) {
	this.players[playerIndex].maritimeTrade(inputResource, ratio, outputResource);
	this.bank.deposit(inputResource, ratio);
	this.bank.withdraw(outputResource, 1);
};

GameModel.prototype.discardCards = function(playerIndex, cardsToDiscard) {
	this.players[playerIndex].discardCards(cardsToDiscard);
	this.bank.depositResources(cardsToDiscard);

	var changeStatus = true;

	this.players.forEach(function(player) {
		if (!player.hasDiscarded())
			changeStatus = false;
	});

	if (changeStatus)
		this.turnTracker.setStatus('Playing');
};