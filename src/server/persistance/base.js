/**
 * @module catan.persistance
 * @namespace persistance
 */

module.exports = BasePL;

/**
 * @class BasePL
 * @constructor
 */
function BasePL() {}

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
BasePL.prototype.persistGame = function(data, callback) {};

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
BasePL.prototype.persistUser = function(username, password, callback) {};

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
BasePL.prototype.persistCommand = function(data, callback) {};

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
BasePL.prototype.updateGame = function(id, data, callback) {};

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
BasePL.prototype.readAllUsers = function(callback) {};

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
BasePL.prototype.getRecentGameCommands = function(gameid, id, callback) {};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @return {object[]} list of json game objects
 */
BasePL.prototype.getAllGameInfo = function(callback) {};

