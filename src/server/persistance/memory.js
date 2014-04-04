
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
MemoryPL.prototype.persistGame(data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A new user is persisted, and the ID is returned
 * </pre>
 * @method persistUser
 * @param {object} data the user data
 * @return {int} userId
 */
MemoryPL.prototype.persistUser(data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A command is added and the new id is returned
 * </pre>
 * @method persistCommand
 * @param {object} data the command data
 * @return {int} commandId
 */
MemoryPL.prototype.persistCommand(data){};

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
MemoryPL.prototype.updateGame(id, data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method readAllUsers
 * @return {object[]} list of json user objects
 */
MemoryPL.prototype.readAllUsers(){};

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
MemoryPL.prototype.getRecentGameCommands(gameid, id){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @param {int} gameid the game id
 * @return {object[]} list of json game objects
 */
MemoryPL.prototype.getAllGameInfo(id){};

