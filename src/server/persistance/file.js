var BasePL = require('./base.js');
var util = require('util');
var fs = require('fs'),
	path = require('path'),
	_ = require('lodash');

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
	this.nextGameID = 3;
	this.nextUserID = 101;
	this.nextCommandID = [];
	this.users = [];
	this.games = [];
	this.commands = {};
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: The game is persisted, and the ID is returned
 * </pre>
 * @method persistGame
 * @param {object} title the title of the game
 * @param {object} data the game data
 * @param {Function} callback callback(error,gameId)
 * @return {void}
 */
FilePL.prototype.persistGame = function(title, data, callback){
	var id = this.nextGameID++;
	var gameInfo = {'id':id, 'title':title, 'last_command_id':-1, 'current':_.cloneDeep(data), 'original':_.cloneDeep(data)};
	
	try {
		fs.writeFile(this.rootPath + '/game' + id + '.json', JSON.stringify(gameInfo), null, function(error){
			if (error) throw error;
			return callback(null, id);
		}.bind(this));
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
	var user = {'playerID':id, 'username':username, 'password':password};
	
	try {
		this.readAllUsers(function(err, users){
			if (err) throw err;
			users.push(user);

			fs.writeFile(this.rootPath + '/users.json', JSON.stringify(users), null, function(err2){
				if (err2) throw err2;
				return callback(null, id);
			}.bind(this));

		}.bind(this));
	}

	catch (err) {
		this.nextUserID--;
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

	if (!this.commands[gameID])
		this.commands[gameID] = [];

	var id = this.nextCommandID[gameID]++;
	var command = {id: id, game_id: gameID, data: _.cloneDeep(data)};
	this.commands[gameID].push(command);
	//var commands = [];

	//commands.push(command);
	
	try {
		fs.writeFile(this.rootPath + '/commands' + gameID + '.json', JSON.stringify(this.commands[gameID]/*commands*/), null, function(error){
			if (error) throw error;
			return callback(null, id);
		});
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
	var path = this.rootPath + '/game' + gameid + '.json';

	try {
		fs.readFile(path, function(err, dataFromFile){
			if (err) throw err;
			
			var gameInfo = JSON.parse(dataFromFile);
			gameInfo.current = data;
			gameInfo.last_command_id = lastCommand;

			fs.writeFile(path, JSON.stringify(gameInfo), null, function(err2){
				if (err2) throw err2;
				return callback(null);
			}.bind(this));
		
		}.bind(this));
	}

	catch (err) {
		return callback(err);
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
		fs.readFile(this.rootPath + '/users.json', function(err, data){
  			if (err) throw err;
  			this.users = JSON.parse(data);
  			return callback(null, this.users);
		}.bind(this));
	}

	catch (err) {
		return callback(err, null);
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
	var filepath = this.rootPath + '/commands' + gameid + '.json';

	try {
		getAllGameCommands(filepath, function(allCommands){
			var recentCommands = [];

			allCommands.forEach(function(command){
				if (command.id > id)
					recentCommands.push(command);
			});

			return callback(null, recentCommands);
		});
	}

	catch (err) {
		return (null, []);
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
		fs.readdir(this.rootPath, function(err, files){
  			if (err) throw err;
  			
  			var games = {};

			var filePattern = /game(\d+)\.json/;
  			files.forEach(function(fileName){
  				var matches=fileName.match(filePattern);
  				if (matches){
  					var id=matches[1];
  					var data = fs.readFileSync(path.join(this.rootPath ,fileName));
					var gameData = JSON.parse(data);
  					games[id]=gameData;
  				}
  			}.bind(this))

  			return callback(null, _(games).toArray().value());

		}.bind(this));
	}

	catch (err) {
		return callback(err, null);
	}
};

function getAllGameCommands(filepath, callback){
	fs.readFile(filepath, function(err, data){
		if (err) 
			return callback([]);
		else
			return callback(JSON.parse(data));
	});
};
