var sqlite3 = require('sqlite3').verbose(),
	path = require('path'),
	CatanError = require('../../common/Errors').CatanError;

/**
 * @module catan.persistance
 * @namespace persistance
 */

module.exports = SQLitePL;

/**
 * @class SQLitePL
 * @constructor
 * @param {string} rootPath absolute filepath to the directory where data is stored
 */
function SQLitePL(rootPath) {
	this.db = new sqlite3.Database(path.join(rootPath, 'catandb.sqlite3'));
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
SQLitePL.prototype.persistGame = function(data, callback) {

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
SQLitePL.prototype.persistUser = function(username, password, callback) {

	this.db.run('INSERT INTO users (username,password) VALUES(?,?)', [username, password], function(err, lastId, rowsChanged) {
		if(!callback)
			return;

		if (err) {
			callback(err);
		} else if (rowsChanged === 0) {
			callback('User not created');
		} else {
			callback(null, lastId);
		}
	});

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
SQLitePL.prototype.persistCommand = function(data, callback) {};

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
SQLitePL.prototype.updateGame = function(id, data, callback) {};

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
SQLitePL.prototype.readAllUsers = function(callback) {};

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
SQLitePL.prototype.getRecentGameCommands = function(gameid, id, callback) {};

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
SQLitePL.prototype.getAllGameInfo = function(id, callback) {};