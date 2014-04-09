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
	this.users = [];
	this.nextCommandID = [];
}

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

	//persist data, assign a UID, return the ID of the new game
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
		fs.writeFile(this.rootPath + '/users.json', JSON.stringify(this.users), null, function(error){
			if (error) throw error;
		});

		return callback(null, id);
	}

	catch (error) {
		this.nextUserID--;
		this.users.pop();
		return callback(error, -1);
	}

	/*try {
		if (ID == 0) {
			fs.appendFile('data/users.json', JSON.stringify(user), null, function(err){
				if (err) throw err;
			});
		}

		else {
			fs.appendFile('data/users.json', ',' + JSON.stringify(user), null, function(err){
				if (err) throw err;
			});
		}
		
		return callback(null, ID);
	}

	catch (err) {
		this.nextUserID--;
		return callback(err, -1);
	}*/
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
	//persist data, assign a UID, returns the ID
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: The game is updated
 * </pre>
 * @method updateGame
 * @param {int} gameid the game id
 * @param {object} data the game data
 * @param {Function} callback callback(error)
 * @return {void}
 */
FilePL.prototype.updateGame = function(gameid, lastCommand, data, callback){
	//Overwrites the data for the game specified by the ID
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
		var users;
		fs.readFile(this.rootPath + '/users.json', function(error, data){
  			if (error) throw error;
  			users = JSON.parse(data);
		});

		return callback(null, users);
	}

	catch (error) {
		return callback(error, hull);
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
	//From the commands file, get the commands executed from the last checkpoint
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @param {int} gameid the game id
 * @param {Function} callback callback(error,games) where users is a list of game objects
 * @return {void}
 */
FilePL.prototype.getAllGameInfo = function(id, callback){
	//Read each games file and create a list of games, return that list
};
