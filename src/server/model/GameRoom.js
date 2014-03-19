module.exports = GameRoom;

/**
  This module contains the game room
  
  @module   catan.server.model
  @namespace servermodel
*/

/** 
* This class represents a game room with a list of players and games

* @class GameRoom
* @constructor
* @param {integer} playerID The id of the local player, extracted from the cookie
*/
function GameRoom(){
  this.users = [];
  this.AIPlayers = [];
  this.games = [];
};

GameRoom.prototype.login = function(username, password) {

};

GameRoom.prototype.registerUser = function(username, password) {

};

GameRoom.prototype.listGames = function() {
	return games;
};

GameRoom.prototype.createGame = function(randomTiles, randomNumbers, randomPorts, name) {

};

GameRoom.prototype.joinGame = function(color, gameID) {

};

GameRoom.prototype.getGameModel = function(gameID) {

};

GameRoom.prototype.resetGame = function(gameID) {

};

GameRoom.prototype.sendCommands = function(gameID, listOfCommands) {

};

GameRoom.prototype.listCommands = function(gameID) {

};

GameRoom.prototype.addAIPlayer = function(gameID, AIPlayer) {

};

GameRoom.prototype.listAIPlayers = function(gameID) {

};

GameRoom.prototype.setLogLevel = function(gameID, logLevel) {

};
