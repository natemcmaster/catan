var BaseModel = require('../BaseModel');
var util = require('util');

module.exports = GameBoard;
util.inherits(GameBoard, BaseModel);

function GameBoard(data, $Bank, $Deck, $Map, $Player, $TurnTracker) {

	if(!data){
		this.bank = $Bank();
		this.deck = $Deck();
		this.map = $Map();
		this.turnTracker = $TurnTracker();
		this.players = [];
		for(var i = 0; i < 4; i++){
			this.players.push($Player(undefined, i));
		}

		this.data = {'bank' : this.bank,
					 'deck' : this.deck,
					 'map' : this.map,
					 'turnTracker' : this.turnTracker,
					 'players' :  this.players,
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
		this.turnTracker = $TurnTracker(this.data.turnTracker);

		this.players = [];
		for(var i = 0; i < 4; i++){
			this.players.push($Player(this.data.players[i], i));
		}

	}
	

	
};

GameBoard.prototype.rollNumber = function(playerIndex, number) {

};

GameBoard.prototype.robPlayer = function(playerIndex, victimIndex, location) {

};

GameBoard.prototype.finishTurn = function(playerIndex) {

};

GameBoard.prototype.buyDevCard = function(playerIndex) {
	this.players[playerIndex].buyDevCard(this.deck.drawRandomCard());
};

GameBoard.prototype.playYearOfPlenty = function(playerIndex, resource1, resource2) {
	this.bank.withdraw(resource1);
	this.bank.withdraw(resource2);

	players[playerIndex].playYearOfPlenty(resource1, resource2);
};

GameBoard.prototype.playRoadBuilding = function(playerIndex, spot1, spot2) {

};

GameBoard.prototype.playSoldier = function(playerIndex, victimIndex, location) {

};

GameBoard.prototype.playMonopoly = function(playerIndex, resource) {

};

GameBoard.prototype.playMonument = function(playerIndex) {

};

GameBoard.prototype.buildRoad = function(playerIndex, roadLocation, free) {

};

GameBoard.prototype.buildSettlement = function(playerIndex, vertexLocation, free) {

};

GameBoard.prototype.buildCity = function(playerIndex, vertexLocation, free) {

};

GameBoard.prototype.offerTrade = function(playerIndex, offer, receiver) {

};

GameBoard.prototype.acceptTrade = function(playerIndex, willAccept) {

};

GameBoard.prototype.maritimeTrade = function(playerIndex, ratio, inputResource, outputResource) {

};

GameBoard.prototype.discardCards = function(playerIndex, cardsToDiscard) {

};
