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
	this.db.run('PRAGMA FOREIGN_KEYS=on;',function(err){
		console.log(err);
	});
}

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
SQLitePL.prototype.persistGame = function(title, data, callback) {
	var blob = JSON.stringify(data);
	this.db.run('INSERT INTO games (original_state,current_state) VALUEs (?,?)', [blob, blob], function(err) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
		} else if (!this.lastID && this.lastID !== 0) {
			callback('Game not created');
		} else {
			callback(null, this.lastID);
		}
	});
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

	this.db.run('INSERT INTO users (username,password) VALUES(?,?)', [username, password], function(err) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
		} else if (!this.lastID && this.lastID !== 0) {
			callback('User not created');
		} else {
			callback(null, this.lastID);
		}
	});

};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A command is added and the new id is returned
 * </pre>
 * @method persistCommand
 * @param {int} gameId the game id
 * @param {object} data the command data
 * @param {Function} callback callback(error,commandId)
 * @return {void}
 */
SQLitePL.prototype.persistCommand = function(gameId, data, callback) {
	var blob = JSON.stringify(data);
	this.db.run('INSERT INTO commands (game_id,json_blob) VALUES (?,?)', [gameId, blob], function(err) {
		if (!callback) {
			return;
		}

		if (err) {
			callback(err);
		} else if (!this.lastID && this.lastID !== 0) {
			callback('Command not created');
		} else {
			callback(null, this.lastID);
		}
	});

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
SQLitePL.prototype.updateGame = function(id, lastCommandId, data, callback) {
	var blob = JSON.stringify(data);
	this.db.run('UPDATE games set current_state = ?, last_command_id = ? where id = ?', [data, lastCommandId, id], function(err) {
		if (!callback) {
			return;
		}
		if(err){
			callback(err)
		} else if(!this.changes) {
			callback('Could not update');
		} else{
			callback(null);
		}
	});
};

/**
 * <pre>
 * Pre-condition: Callback is a function
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
SQLitePL.prototype.readAllUsers = function(callback) {
	this.db.all('select id as playerID,username,password from users',callback);
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
SQLitePL.prototype.getRecentGameCommands = function(gameid, id, callback) {
	this.db.all('select * from commands where game_id = ? and id > ?',[gameid,id],function(err,rows){
		if(err ){
			callback(err)
		} else{
			rows = rows.map(function(r){
				r.data = JSON.parse(r.json_blob);
				delete r.json_blob;
				return r;
			})
			callback(null,rows);
		}
	})
};

/**
 * <pre>
 * Pre-condition: gameId is a number
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @param {Function} callback callback(error,games) where games is a list of game objects
 * @return {void}
 */
SQLitePL.prototype.getAllGameInfo = function(callback) {
	this.db.all('select * from games',function(err,rows){
    if(err) {
      return callback(err || 'No game found');
    }
    callback(null, rows.map(function (row) {
      row.original = JSON.parse(row.original_state);
      row.current = JSON.parse(row.current_state);
      delete row.original_state;
      delete row.current_state;
      return row
    }))
	});
};
