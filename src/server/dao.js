
/**
 * @module catan
 * @namespace catan
 */

module.exports = DAO;

/**
 * @class DAO
 * @constructor
 */
function DAO($PersistanceLayer) {
  this.pl = $PersistanceLayer();
}

/**
 * <pre>
 * Post-Condition: the created game room object has all of the previously
 * persisted data in it
 * </pre>
 * @method createGameRoom
 * @return {GameRoom} the created game room
 */
DAO.prototype.createGameRoom = function () {
}

/**
 * <pre>
 * Post-condition: the command is persisted
 * </pre>
 * @method persistCommand
 * @param {object} command
 * @return {int} command id
 */
DAO.prototype.persistCommand = function (command) {
  // check the number of commmands that have been executed, should I serialize
  // the game?
}

/**
 * <pre>
 * Pre-condition: the username is not taken already
 * Post-condition: the user is created
 * </pre>
 * @method createUser
 * @param {str} user
 * @param {str} password
 * @return {int} the userid
 */
DAO.prototype.createUser = function (user, password) {
}

/**
 * <pre>
 * Post-condition: the game is created
 * </pre>
 * @method createGame
 * @param {object} gameinfo
 * @return {int} gameId
 */
DAO.prototype.createGame = function (gameinfo) {
}

/**
 * <pre>
 * Post-condition: the game is updated
 * </pre>
 * @method updateGame
 * @param {int} id
 * @param {object} gameinfo
 * @return {void}
 */
DAO.prototype.updateGame = function (id, gameinfo) {
}

