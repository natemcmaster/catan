module.exports = GameRoom;
var _ = require('underscore');
var CatanError = require('../../common').Errors.CatanError;

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
function GameRoom(users, games, $UserRepo,$GameRepo){
  this.userRepo =  $UserRepo();
  this.gameRepo =  $GameRepo();
  this.users = users || this.userRepo.getAll();
  this.games = games || this.gameRepo.getAll();
};

GameRoom.prototype.getGameByID = function(gameID) {
	return _(this.games).find(function(s){
		return s.id == gameID;
	});
};

GameRoom.prototype.getUserByID = function(playerID) {
	return _(this.users).find(function(s){
		return s.playerID == playerID;
	});
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
	var user=this.userRepo.create(username,password);
	if(!user)
		return false;
	this.users.push(user);
	return user;
};

var gameSummary = function(s){
	var players = _(s.model.players).map(function(p){
		return {
			name: p.name,
			id: p.playerID,
			color: p.color
		};
	});
	while(players.length < 4){
		players.push({});
	}
	return {
		title: s.title,
		id: s.id,
		players: players
	}
}

GameRoom.prototype.listGames = function() {
	return _(this.games).map(gameSummary);
};

GameRoom.prototype.createGame = function(title, randomTiles, randomNumbers, randomPorts) {
	var newGame = this.gameRepo.create(title,randomTiles,randomNumbers,randomPorts);
	if(newGame)
		this.games.push(newGame);
	else
		throw new Error('Could not create game');
	return gameSummary(newGame);
};

GameRoom.prototype.joinGame = function(playerID, color, gameID) {
	var game = this.getGameByID(gameID);
	if(!game)
		throw new CatanError('Could not find game');
	if(!game.model.updateColor(playerID,color)){
		var user = this.getUserByID(playerID);
		game.model.addPlayer(user.playerID,user.username,color)
	}
	process.nextTick(function() {
		this.gameRepo.update(gameID, game, 'players');
	}.bind(this));
	return true;
};

GameRoom.prototype.getGameModel = function(gameID) {
  return this.getGameByID(gameID).model;
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
