module.exports = GameRoom;
var _ = require('underscore');
/**
  This module contains the game room
  
  @module   catan.server.model
  @namespace servermodel
*/

/** 
* This class represents a game room with a list of users and games

* @class GameRoom
* @constructor
* @param {integer} playerID The id of the local player, extracted from the cookie
*/
function GameRoom(users, games, $User, $UserIDGenerator){
  this.users = users || [];
  this.games = games || [];
  this.makeUser = $User;
  this.idGen = $UserIDGenerator();
};

GameRoom.prototype.getGameByID = function(gameID) {

};

//--------------------------------------------------------------
// Commands
//--------------------------------------------------------------

GameRoom.prototype.login = function(username, password) {
	var user = _(this.users).find(function(u){
		return u.username == username;
	});
	if(!user || user.password !== password)
		return false;
	return user;
};

GameRoom.prototype.registerUser = function(username, password) {
	var user = _(this.users).find(function(u){
		return u.username == username;
	});
	if(user)
		return false;
	var user=this.makeUser(username,password,this.idGen.next());
	this.users.push(user);
	return user;
};

GameRoom.prototype.listGames = function() {
	return this.games;
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
	//Not implementing
};

GameRoom.prototype.listAIPlayers = function(gameID) {
	//Not implementing
};

GameRoom.prototype.setLogLevel = function(gameID, logLevel) {

};
