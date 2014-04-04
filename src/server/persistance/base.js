
/**
 * @module catan.persistance
 * @namespace persistance
 */

module.exports = BasePL;

/**
 * @class FilePL
 * @constructor
 */
function BasePL() {
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A game is created, and the ID is returned
 * </pre>
 * @method createGame
 * @param {object} data the game data
 * @return {int} gameId
 */
BasePL.prototype.createGame(data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A new user is created, and the ID is returned
 * </pre>
 * @method createUser
 * @param {object} data the user data
 * @return {int} userId
 */
BasePL.prototype.createUser(data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A command is added and the new id is returned
 * </pre>
 * @method persistCommand
 * @param {object} data the command data
 * @return {int} commandId
 */
BasePL.prototype.persistCommand(data){};

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
BasePL.prototype.updateGame(id, data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method readAllUsers
 * @return {object[]} list of json user objects
 */
BasePL.prototype.readAllUsers(){};

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
BasePL.prototype.getRecentGameCommands(gameid, id){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @param {int} gameid the game id
 * @return {object[]} list of json game objects
 */
BasePL.prototype.getAllGameInfo(id){};

