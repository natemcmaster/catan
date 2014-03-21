var BaseModel = require('./BaseModel');
var util = require('util');

module.exports = GameModel;
util.inherits(Game, BaseModel);

/** 
* This is the server model class

* @class Game
* @constructor
* @param {data} playerID The id of the local player, extracted from the cookie
*/
function Game(data, $Log, $Chat, $Bank, $Deck, $Map, $Player, $TurnTracker){


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



  this.gameboard = $GameBoard(data);
};

GameModel.prototype.sendChat = function(playerIndex, message) {
	this.sendChat(playerIndex,message);
};

GameModel.prototype.rollNumber = function(playerIndex, number) {

};

GameModel.prototype.robPlayer = function(playerIndex, victimIndex, location) {

};

GameModel.prototype.finishTurn = function(playerIndex) {

};

GameModel.prototype.buyDevCard = function(playerIndex) {
	this.players[playerIndex].buyDevCard(this.deck.drawRandomCard());
};

GameModel.prototype.playYearOfPlenty = function(playerIndex, resource1, resource2) {
	this.bank.withdraw(resource1);
	this.bank.withdraw(resource2);

	players[playerIndex].playYearOfPlenty(resource1, resource2);
};

GameModel.prototype.playRoadBuilding = function(playerIndex, spot1, spot2) {

};

GameModel.prototype.playSoldier = function(playerIndex, victimIndex, location) {

};

GameModel.prototype.playMonopoly = function(playerIndex, resource) {

};

GameModel.prototype.playMonument = function(playerIndex) {

};

GameModel.prototype.buildRoad = function(playerIndex, roadLocation, free) {

};

GameModel.prototype.buildSettlement = function(playerIndex, vertexLocation, free) {

};

GameModel.prototype.buildCity = function(playerIndex, vertexLocation, free) {

};

GameModel.prototype.offerTrade = function(playerIndex, offer, receiver) {

};

GameModel.prototype.acceptTrade = function(playerIndex, willAccept) {

};

GameModel.prototype.maritimeTrade = function(playerIndex, ratio, inputResource, outputResource) {

};

GameModel.prototype.discardCards = function(playerIndex, cardsToDiscard) {

};
