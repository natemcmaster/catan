var BasePL = require('./BasePL');
var util = require('util');
var fs = require('fs');

/**
 * @module catan.persistance
 * @namespace persistance
 */

module.exports = FilePL;
util.inherits(FilePL, BasePL);

/**
 * @class BasePL
 * @constructor
 * @param {string} rootPath absolute filepath to the directory where data is stored
 */
function FilePL(rootPath) {
	this.rootPath = rootPath;
	this.nextGameID = 0;
	this.nextUserID = 0;
	this.nextCommandID = [];
	this.users = [];
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: The game is persisted, and the ID is returned
 * </pre>
 * @method persistGame
 * @param {object} data the game data
 * @param {Function} callback callback(error,gameId)
 * @return {void}
 */
FilePL.prototype.persistGame = function(data, callback){
	var id = this.nextGameID++;
	var gameInfo = {'id':id, 'currentGame':data, 'originalGame':data, 'lastCommand':0};
	
	try {
		fs.writeFile(this.rootPath + 'game' + id + '.json', JSON.stringify(gameInfo), null, function(error){
			if (error) throw error;
		});

		return callback(null, id);
	}

	catch (error) {
		this.nextGameID--;
		return callback(error, -1);
	}
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: The new user is persisted, and the ID is returned
 * </pre>
 * @method persistUser
 * @param {string} username
 * @param {string} password
 * @param {Function} callback callback(error,userId)
 * @return {void}
 */
FilePL.prototype.persistUser = function(username, password, callback){
	var id = this.nextUserID++;
	var user = {'id':id, 'username':username, 'password':password};
	this.users.push(user);
	
	try {
		fs.writeFile(this.rootPath + 'users.json', JSON.stringify(this.users), null, function(error){
			if (error) throw error;
		});

		return callback(null, id);
	}

	catch (error) {
		this.nextUserID--;
		this.users.pop();
		return callback(error, -1);
	}
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A command is added and the new id is returned
 * </pre>
 * @method persistCommand
 * @param {object} data the command data
 * @param {Function} callback callback(error,commandId)
 * @return {void}
 */
FilePL.prototype.persistCommand = function(gameID, data, callback){
	if (!this.nextCommandID[gameID])
		this.nextCommandID[gameID] = 0;

	var id = this.nextCommandID[gameID]++;
	
	try {
		fs.writeFile(this.rootPath + 'command' + id + '.json', JSON.stringify(data), null, function(error){
			if (error) throw error;
		});

		return callback(null, id);
	}

	catch (error) {
		this.nextCommandID[gameID]--;
		return callback(error, -1);
	}
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: The game is updated
 * </pre>
 * @method updateGame
 * @param {int} gameid the game id
 * @param {int} lastCommand the id of the last executed command
 * @param {object} data the game data
 * @param {Function} callback callback(error)
 * @return {void}
 */
FilePL.prototype.updateGame = function(gameid, lastCommand, data, callback){
	try {
		var gameInfo;
		fs.readFile(this.rootPath + 'game' + gameid + '.json', function(error, data){
			if (error) throw error;
			gameInfo = JSON.parse(data);
		});

		gameInfo.currentGame = data;
		gameInfo.lastCommand = lastCommand;

		return callback(null);
	}

	catch (error) {
		return callback(error);
	}
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method readAllUsers
 * @param {Function} callback callback(error,users) where users is a list of user objects
 *  {
 *      id:<id>,
 *      username:<username>,
 *      password:<password>
 *  }
 * @return {void}
 */
FilePL.prototype.readAllUsers = function(callback){
	try {
		var users = null;
		fs.readFile(this.rootPath + 'users.json', function(error, data){
  			if (error) throw error;
  			users = JSON.parse(data);
		});

		return callback(null, users);
	}

	catch (error) {
		return callback(error, null);
	}
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getRecentGameCommands
 * @param {int} gameid the game id
 * @param {int} id the id of the last command executed
 * @param {Function} callback callback(error,commands) where users is a list of command objects
 * @return {void}
 */
FilePL.prototype.getRecentGameCommands = function(gameid, id, callback){
	try {
		var commands = null;
		fs.readFile(this.rootPath + 'commands' + gameid + '.json', function(error, data){
  			if (error) throw error;
  			commands = JSON.parse(data);
		});

		var recentCommands = [];

		commands.forEach(function(command){
			if (command.id > id)
				recentCommands.push(command);
		});

		return callback(null, recentCommands);
	}

	catch (error) {
		return callback(error, null);
	}
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @param {Function} callback callback(error,games) where users is a list of game objects
 * @return {void}
 */
FilePL.prototype.getAllGameInfo = function(callback){
	try {
		var games = null;
		fs.readdir(this.rootPath, function(error, files){
  			if (error) throw error;
  			
  			files.forEach(function(file){
  				if ("game".indexOf(file) !== -1)
  					fs.readFile(this.rootPath + file, function(error, data){
  						if (error) throw error;
  						gameData = JSON.parse(data);
  						games.push(gameData.currentGame);
  					})
  			})
		});

		return callback(null, games);
	}

	catch (error) {
		return callback(error, null);
	}
};
