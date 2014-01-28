/**
 * 
 * @module catan.model
 * @namespace model
 */

module.exports = Proxy;

/**
 * Keeps track of the Proxy
 * <pre>
 * 
 * </pre>
 * @class Proxy
 * @constructor
 */
function Proxy(proxy){
	// constructor
	this.proxy = proxy;
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method mostRecentEntry
 * @param {String} username
 * @param {String} password
 * @return {int} 200 if logged in, 400 if not
 * 
 */
Proxy.prototype.login = function (username, password) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method register
 * @param {String} username
 * @param {String} password
 * @return {void}
 * 
 */
Proxy.prototype.register = function (username,password) {
};


/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getAllGames
 * @return {Object[]} Array of games
 * 
 */
Proxy.prototype.getAllGames = function () {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; gives JSON Object containing new game information.
 * </pre>
 * 
 * @method createGame
 * @param {boolean} randomTiles Random Tiles
 * @param {boolean} randomNumbers Random Numbers
 * @param {boolean} randomPorts Random Ports
 * @param {String} gameName Game name
 * @param {function} callback 
 * @return {void}
 */
Proxy.prototype.createGame = function (randomTiles, randomNumbers, randomPorts, gameName, cb) {
};

/**
 * <pre>
* Pre-condition: NONE
* Post-condition: Callback is called; gives JSON Object containing game join info: joined, not joined, etc...
* </pre>
* @method joinGame
* @param {String} color Color of player to join game
* @param {int} playerId ID of player to join
* @param {function} cb callback
* 
* @return
 */
Proxy.prototype.joinGame = function (color, playerId, cb) {
};

/**
* <pre>
* Pre-condition: NONE
* Post-condition: Callback is called; gives JSON Object containing entire game model.
* </pre>
* @method getModel
* @param {function} cb callback
* 
 */
Proxy.prototype.getModel = function (cb) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; gives JSON Object containing a fresh, new game model.
 * </pre>
 * @method resetGame
 * @param {function} cb callback
 * 
 */
Proxy.prototype.resetGame = function (cb) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; gives entire game model
 * </pre>
 * @method sendCommands
 * @param {Object[]} commands Array of command objects representing user activity
 * @return
 */
Proxy.prototype.sendCommands = function (commands, cb) {
};


/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; gives JSON Array of objects containing game commands
 * </pre>
 * @method getCommands
 * 
 */
Proxy.prototype.getCommands = function () {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; gives JSON Object containing success or failure.
 * </pre>
 * @method addAI
 * @param {String} type Type of AI
 * @param {function} cb callback
 * 
 */
Proxy.prototype.addAI = function (type, cb) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; gives array of strings representing types of AI's
 * </pre>
 * @method listAI
 * @param {function} cb callback
 * 
 */
Proxy.prototype.listAI = function (cb) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; JSON Object containing success/failure of request.
 * </pre>
 * @method changeLogLevel
 * @return
 * @param {String} level Representation of log level
 * @param {function} cb callback
 * 
 */
Proxy.prototype.changeLogLevel = function (level, cb) {
};

/**
<pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method sendChat
 * @param {int} playerId ID of player
 * @param {String} content content of message
 * @param {function} cb callback
 * 
 */
Proxy.prototype.sendChat = function (playerId, content, cb) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method rollNumber
 * @param {int} playerId ID of player
 * @param {int} number Number of roll
 * 
 */
Proxy.prototype.rollNumber = function (playerId, number) {
};

/**
 * <pre>
 * Pre-condition: Player is not him/herself.
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method robPlayer
 * @param {int} thiefPlayerId ID of robbing player
 * @param {int} victimPlayerId ID of robbed victim
 * @param {HexLocation} location New position of the robber
 * 
 */
Proxy.prototype.robPlayer = function (thiefPlayerId, victimPlayerId, location) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called;
 * </pre>
 * @method finishTurn
 * @param {function} cb Callback
 * @return
 */
Proxy.prototype.finishTurn = function (cb) {
};

/**
 * <pre>
 * Pre-condition: Player ID is allowed to buy dev card
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method buyDevCard
 * @param {int} playerId ID of player
 * @param {function} callback
 * 
 */
Proxy.prototype.buyDevCard = function (playerId, cb) {
};


/**
 * <pre>
 * Pre-condition: Player has card
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method yearOfPlenty
 * @param {int} playerId ID of player playing card
 * @param {int} resourceOne Type of card
 * @param {int} resourceTwo Type of card
 * @param {function} cb callback
 * 
 */
Proxy.prototype.yearOfPlenty = function (playerId, resourceOne, resourceTwo, cb) {
};

/**
 * <pre>
 * Pre-condition: Roads can be built at specified locations.
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method roadBuilding
 * @param {int} playerId ID of player
 * @param {Edge[]} roadLocations Array of two Edge objects representing the two roads to be built.
 * @param {function} cb Callback
 * 
 */
Proxy.prototype.roadBuilding = function (playerId, roadLocations, cb) {
};

/**
 * <pre>
 * Pre-condition: Player has card
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method solider
 * @param {int} playerId ID of player playing solider
 * @param {int} victimId ID of player who the card-playing user selects to steal one resource.
 * @param {HexLocation} newRobberLocation New location of soldier card
 * @param {funtion} cb Callback
 */
Proxy.prototype.solider = function (playerID, victimID, newRobberLocation, cb) {
};

/**
 * <pre>
 * Pre-condition: Player has card
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method monopoly
 * @param {int} resource ID of player who is monopolizing
 * @param {int} playerId Type of resource being monopolized
 * @param {function} cb callback
 */
Proxy.prototype.monopoly = function (resource, playerId, cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method monument
@param {id} playerId ID of player with monument
 * @param {function} cb callback
 */
Proxy.prototype.monument = function (playerId, cb) {
};

/**
 * <pre>
 * Pre-condition: The specified building site is legal to be built on.
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method buildRoad
 * @param {int} playerId ID of player building road
 * @param {EdgeLocation} roadLocation Location of road to be built
 * @param {boolean} isFree True if free, false if not
 * @param {function} cb callback
 */
Proxy.prototype.buildRoad = function (playerId, roadLocation, isFree, cb) {
};

/**
 * <pre>
 * Pre-condition: The specified building site is legal to be built on.
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method buildSettlement
 * @param {int} playerId ID of player building settlement
 * @param {VertexLocation} location Location of settlement to be built
 * @param {boolean}  isFree True if free, false if not
 * @param {function} cb callback
 */
Proxy.prototype.buildSettlement = function (playerId, location, isFree, cb) {
};

/**
 * <pre>
 * Pre-condition: There is a settlement owned by that player at specified location. Player has resources.
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method buildCity
 * @param {int} playerId ID of player building city
 * @param {VertexLocation} location Location of city to be built
 * @param {boolean} isFree True if free, false if not
 * @param {function} cb Callback
 */
Proxy.prototype.buildCity = function (playerId, location, isFree, cb) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method offerTrade
 * @param {int} offeringPlayerId ID of player offering trade
 * @param {int} offeredPlayerId ID of player who is being offered to
 * @param {int} resourceType Type of resource being offered.
 * 
 */
Proxy.prototype.offerTrade = function (offeringPlayerId, offeredPlayerId, resourceType) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method acceptTrade
 * @param {int} playerId ID of player accepting/rejecting trade
 * @param {boolean} playerAccepts True if player accepts, false if not
 * 
 */
Proxy.prototype.acceptTrade = function (playerId, playerAccepts) {
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: Callback is called; JSON Object containing entire game model.
 * </pre>
 * @method discardCards
 * @param {ID} playerId Id of player
 * @param {int[]} discardedResources Array of cardtypes being discarded
 * 
 */
Proxy.prototype.discardCards = function (playerId, discardedResources) {
};

