var _ = require('lodash');
/**
 * @module catan.persistance
 * @namespace persistance
 */

module.exports = MemoryPL;

/**
 * @class MemoryPL
 * @constructor
 */
function MemoryPL() {
	this.gameId = 0;
	this.games = {};
	this.userId = 0;
	this.users = {
		'0': {
			username: 'Sam',
			password: 'sam',
			playerID: 0
		},
		'1': {
			username: 'Brooke',
			password: 'brooke',
			playerID: 1
		},
		'3': {
			username: 'Quinn',
			password: 'quinn',
			playerID: 3
		},
		'5': {
			username: 'Mark',
			password: 'mark',
			playerID: 5
		},
		'39': {
			username: 'Nate',
			password: 'nate',
			playerID: 39
		},
		'40': {
			username: 'Jared',
			password: 'jared',
			playerID: 40
		},
		'41': {
			username: 'Spence',
			password: 'spence',
			playerID: 41
		},
		'42': {
			username: 'Alan',
			password: 'alan',
			playerID: 42
		},
		'43': {
			username: 'Chris',
			password: 'chris',
			playerID: 43
		},
		'9999999999': {
			username: 'chuck',
			password: 'norris',
			playerID: 9999999999
		},
	};
	this.commandId = 0;
	this.commands = {};
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A game is persisted, and the ID is returned
 * </pre>
 * @method persistGame
 * @param {object} title the title of the game
 * @param {object} data the game data
 * @param {Function} callback
 * @return {int} gameId
 */
MemoryPL.prototype.persistGame = function(title, data, callback) {
	++this.gameId;
	this.games[this.gameId] = {
		id: this.gameId,
		current: _.cloneDeep(data),
		original: _.cloneDeep(data),
		last_command_id: -1
	};
	callback(null, this.gameId);
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A new user is persisted, and the ID is returned
 * </pre>
 * @method persistUser
 * @param {object} data the user data
 * @param {Function} callback
 * @return {int} userId
 */
MemoryPL.prototype.persistUser = function(data, callback) {
	++this.userId;
	this.users[this.userId] = {
		playerID: this.userId,
		username: data.username,
		password: data.password
	};
	callback(null, this.userId);
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A command is added and the new id is returned
 * </pre>
 * @method persistCommand
 * @param {object} data the command data
 * @return {int} commandId
 */
MemoryPL.prototype.persistCommand = function(gameId, data, callback) {
	++this.commandId;
	this.commands[this.commandId] = {
		id: this.commandId,
		game_id: gameId,
		data: this.commandId
	};
	callback(null, this.commandId);
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: The game is updated
 * </pre>
 * @method updateGame
 * @param {int} gameid the game id
 * @param {object} data the game data
 * @return {void}
 */
MemoryPL.prototype.updateGame = function(id, lastCommandId, data, callback) {
	this.games[id].current = _.cloneDeep(data);
	this.games[id].last_command_id = lastCommandId;
	callback(null);
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method readAllUsers
 * @return {object[]} list of json user objects
 */
MemoryPL.prototype.readAllUsers = function(callback) {
	callback(null, _(this.users).toArray().value());
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getRecentGameCommands
 * @param {int} gameid the game id
 * @param {int} id the id of the last command executed
 * @return {object[]} list of json command objects
 */
MemoryPL.prototype.getRecentGameCommands = function(gameid, id, callback) {
	var d = _(this.commands).filter(function(c) {
		return c.game_id == gameid && c.id > id;
	});
	callback(null, d);
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @return {object[]} list of json game objects
 */
MemoryPL.prototype.getAllGameInfo = function(callback) {
	callback(null, _(this.games).toArray().value());
};
