
/**
 * @module catan.persistance
 * @namespace persistance
 */

module.exports = SqlitePL;

/**
 * @class SqlitePL
 * @constructor
 */
function SqlitePL() {
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A game is persisted, and the ID is returned
 * </pre>
 * @method persistGame
 * @param {object} data the game data
 * @return {int} gameId
 */
SqlitePL.prototype.persistGame(data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A new user is persisted, and the ID is returned
 * </pre>
 * @method persistUser
 * @param {object} data the user data
 * @return {int} userId
 */
SqlitePL.prototype.persistUser(data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A command is added and the new id is returned
 * </pre>
 * @method persistCommand
 * @param {object} data the command data
 * @return {int} commandId
 */
SqlitePL.prototype.persistCommand(data){};

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
SqlitePL.prototype.updateGame(id, data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method readAllUsers
 * @return {object[]} list of json user objects
 */
SqlitePL.prototype.readAllUsers(){};

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
SqlitePL.prototype.getRecentGameCommands(gameid, id){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @param {int} gameid the game id
 * @return {object[]} list of json game objects
 */
SqlitePL.prototype.getAllGameInfo(id){};

