module.exports = GameRoom;
var _ = require('underscore');
var CatanError = require('../../common/Errors').CatanError;
var debug = require('debug')('catan:models:gameroom')
  , async = require('async')

/**
  This module contains the game room
  
  @module   catan.server.model
  @namespace servermodel
*/

/** 
 * This class represents a game room with a list of users and games
 
 * @class GameRoom
 * @constructor
 */
function GameRoom(dataRoot, commandsToPersist, ready, $DAO) {
	this.dao = $DAO(dataRoot, commandsToPersist);
  var that = this

  this.dao.getAllData(function (err, data) {
    if (err) return ready(err)
    debug('setup', data)
    that.users = data.users || [];
    that.games = data.games || [];
    ready(null, that)
  })
};

GameRoom.prototype.getGameByID = function(gameID) {
	return _(this.games).find(function(s) {
		return s.id == gameID;
	});
};

GameRoom.prototype.getUserByID = function(playerID) {
	return _(this.users).find(function(s) {
		return s.playerID == playerID;
	});
};

/**
 * Executes a command
 * @param  {AbstractCommand}   command  
 * @param  {Function} callback callback(err)
 * @return {void}            
 */
GameRoom.prototype.executeCommand = function (command, callback) {
  try {
    err = command.execute(this);
  } catch (e) {
    err = e
  }
  if (err) {
    return callback(err)
  }
  console.log(command)
  var response = command.response(this);
  if (response instanceof Error) {
    return callback(response)
  }
  var game = _(this.games).find(function(d){
  	return d.id == command._gameid;
  })
  this.dao.saveCommand(command,game,function(error,commandId){
  	callback(error, commandId);
  })
}

//--------------------------------------------------------------
// Commands
//--------------------------------------------------------------

GameRoom.prototype.login = function(username, password, done) {
	var user = _(this.users).find(function(u) {
		return u.username == username;
	});
	debug('logging in', username, password, !!user, this.users);
	if (!user || user.password !== password)
		return done(null, false)
	done(null, user)
};

GameRoom.prototype.registerUser = function(username, password,callback) {
	var user = _(this.users).find(function(u) {
		return u.username == username;
	});
	if (user)
		return false;
	this.dao.createUser(username,password,function(err,user){
		if(err){
			return callback(err);
		}
		this.users.push(user);
		callback(null, user)
	}.bind(this));
};

var gameSummary = function(s) {
	var players = _(s.model.players).map(function(p) {
		return {
			name: p.name,
			id: p.playerID,
			color: p.color
		};
	});
	while (players.length < 4) {
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

GameRoom.prototype.createGame = function(title, randomTiles, randomNumbers, randomPorts,callback) {
	this.dao.createGame(title, randomTiles, randomNumbers, randomPorts,function(err,game){
		if(err){
			return callback(err);
		}
		this.games.push(game);
		callback(null,gameSummary(game))	
	}.bind(this));
};


// TODO make async
GameRoom.prototype.joinGame = function(playerID, color, gameID, done) {
	var game = this.getGameByID(gameID);
  game.join(playerID, color, this.users)
  /*
	debug('Joining game', gameID);
	if (!game) return new CatanError('Could not find game');
	if (!game.model.updateColor(playerID, color)) {
		if (game.model.players.length >= 4) {
			return done(new Error('Game is full'));
		}
		var user = this.getUserByID(playerID);
		game.model.addPlayer(user.playerID, user.username, color)
	}
	process.nextTick(function() {
		this.gameRepo.update(gameID, game, 'players');
	}.bind(this));
	done(null, true);
  */
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
