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
function GameModel(data, $Log, $Chat, $Bank, $Deck, $Map, $Player, $TurnTracker){


if(!data){
		this.bank = $Bank();
		this.deck = $Deck();
		this.map = $Map();
		this.turnTracker = $TurnTracker();
		this.players = [];
		this.chat = $Chat();
		this.log = $Log();
		for(var i = 0; i < 4; i++){
			this.players.push($Player(undefined, i));
		}

		this.data = {'bank' : this.bank,
					 'deck' : this.deck,
					 'map' : this.map,
					 'turnTracker' : this.turnTracker,
					 'players' :  this.players,
					 'log' : this.log,
					 'chat' : this.chat,
					 'biggestArmy' : -1,
					 'longestRoad' : -1,
					 'winner' : -1;
					 'revision' : 0};

	}

	else{
		this.data = data 

		this.bank = $Bank(this.data.bank);
		this.deck = $Deck(this.data.deck);
		this.map = $Map(this.data.map);
		this.log = $Log(data.log);
  		this.chat = $Chat(data.chat);
		this.turnTracker = $TurnTracker(this.data.turnTracker);

		this.players = [];
		for(var i = 0; i < 4; i++){
			this.players.push($Player(this.data.players[i], i));
		}

	}


};

GameModel.prototype.sendChat = function(playerIndex, message) {
	this.chat.sendChat(playerIndex,message);
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
};

GameModel.prototype.buyDevCard = function(playerIndex) {
	this.players[playerIndex].buyDevCard(this.deck.drawRandomCard());
	//bank
};

GameModel.prototype.playYearOfPlenty = function(playerIndex, resource1, resource2) {
	this.bank.withdraw(resource1);
	this.bank.withdraw(resource2);

	players[playerIndex].playYearOfPlenty(resource1, resource2);


};

GameModel.prototype.playRoadBuilding = function(playerIndex, spot1, spot2) {
	//player
	//map
	//check for longest road
	//check for winner
};

GameModel.prototype.playSoldier = function(playerIndex, victimIndex, location) {
	//players
	//map
	//check for largest army
	//check for winner

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
	//players
	//check for winner
};

GameModel.prototype.buildRoad = function(playerIndex, roadLocation, free) {
	//bank
	//player
	//map
	//check for longest road
	//check for winner
};

GameModel.prototype.buildSettlement = function(playerIndex, vertexLocation, free) {
	//bank
	//player
	//map
	//check for winner
};

GameModel.prototype.buildCity = function(playerIndex, vertexLocation, free) {
	//bank
	//player
	//map
	//check for winner
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
