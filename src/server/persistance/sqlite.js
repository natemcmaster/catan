
/**
 * @module catan.persistance
 * @namespace persistance
 */

module.exports = SqulitePL;

/**
 * @class SqlitePL
 * @constructor
 */
function SqulitePL() {
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
SqulitePL.prototype.createGame(data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A new user is created, and the ID is returned
 * </pre>
 * @method createUser
 * @param {object} data the user data
 * @return {int} userId
 */
SqulitePL.prototype.createUser(data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: A command is added and the new id is returned
 * </pre>
 * @method persistCommand
 * @param {object} data the command data
 * @return {int} commandId
 */
SqulitePL.prototype.persistCommand(data){};

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
SqulitePL.prototype.updateGame(id, data){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method readAllUsers
 * @return {object[]} list of json user objects
 */
SqulitePL.prototype.readAllUsers(){};

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
SqulitePL.prototype.getRecentGameCommands(gameid, id){};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-Condition: NONE
 * </pre>
 * @method getAllGameInfo
 * @param {int} gameid the game id
 * @return {object[]} list of json game objects
 */
SqulitePL.prototype.getAllGameInfo(id){};

