
/**

@module catan.model
@namespace model
**/

module.exports = Proxy;

/**
Keeps track of the Proxy
<pre>

</pre>
@class Proxy
@constructor
**/
function Proxy(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method mostRecentEntry
@return {int} 200 if logged in, 400 if not
@param {String} username
@param {String} password

**/
Proxy.prototype.login = function (username, password) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method register
@return
@param {String} username
@param {String} password

**/
Proxy.prototype.register = function () {
};


/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getAllGames
@return {Object[]} Array of games

**/
Proxy.prototype.getAllGames = function () {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; gives JSON Object containing new game information.
</pre>

@method createGame
@param {boolean} Random Tiles
@param {boolean} Random Numbers
@param {boolean} Random Ports
@param {String} Game name
@param {function} callback 

**/
Proxy.prototype.createGame = function (randomTiles, randomNumbers, randomPorts, gameName, cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; gives JSON Object containing game join info: joined, not joined, etc...
</pre>
@method joinGame
@return

@param {String} Color of player to join game
@param {int} ID of player to join
@param {function} callback

**/
Proxy.prototype.joinGame = function (color, id, cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; gives JSON Object containing entire game model.
</pre>
@method getModel
@param {function} callback

**/
Proxy.prototype.getModel = function (cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; gives JSON Object containing a fresh, new game model.
</pre>
@method resetGame
@param {function} callback

**/
Proxy.prototype.resetGame = function (cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; gives entire game model
</pre>
@method sendCommands
@param {Object[]} Array of command objects representing user activity
@return

**/
Proxy.prototype.sendCommands = function (commands, cb) {
};


/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; gives JSON Array of objects containing game commands
</pre>
@method getCommands

**/
Proxy.prototype.getCommands = function () {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; gives JSON Object containing success or failure.
</pre>
@method addAI
@param {String} Type of AI
@param {function} callback

**/
Proxy.prototype.addAI = function (type, cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; gives array of strings representing types of AI's
</pre>
@method listAI
@param {function} callback

**/
Proxy.prototype.listAI = function (cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; JSON Object containing success/failure of request.
</pre>
@method changeLogLevel
@return
@param {String} Representation of log level
@param {function} callback

**/
Proxy.prototype.changeLogLevel = function (level, cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method sendChat
@param {int} ID of player
@param {String} content of message
@param {function} callback

**/
Proxy.prototype.sendChat = function (playerIndex, content, cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method rollNumber
@param {int} ID of player
@param {int} Number of roll

**/
Proxy.prototype.rollNumber = function (playerIndex, number) {
};

/**
<pre>
Pre-condition: Player is not him/herself.
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method robPlayer
@param {int} ID of robbing player
@param {int} ID of robbed victim
@param {HexLocation} 

**/
Proxy.prototype.robPlayer = function () {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called;
</pre>
@method finishTurn
@return

**/
Proxy.prototype.finishTurn = function () {
};

/**
<pre>
Pre-condition: Player ID is allowed to buy dev card
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method buyDevCard
@param {int} ID of player
@param {function} callback

**/
Proxy.prototype.buyDevCard = function (id, cb) {
};


/**
<pre>
Pre-condition: Player has card
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method yearOfPlenty
@param {int} ID of player playing card
@param {int} Type of card
@param {int} Type of card
@param {function} callback

**/
Proxy.prototype.yearOfPlenty = function (id, resourceOne, resourceTwo, cb) {
};

/**
<pre>
Pre-condition: Roads can be built at specified locations.
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method roadBuilding
@param {int} ID of player
@param {Edge[]} Array of two Edge objects representing the two roads to be built.
@param {function} Callback

**/
Proxy.prototype.roadBuilding = function (id, roadLocations, cb) {
};

/**
<pre>
Pre-condition: Player has card
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method solider
@param {int} ID of player playing solider
@param {int} ID of player who the card-playing user selects to steal one resource.
@param {HexLocation} New location of soldier card

**/
Proxy.prototype.solider = function (playerID, victimID, newRobberLocation, cb) {
};

/**
<pre>
Pre-condition: Player has card
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method monopoly
@param {int} ID of player who is monopolizing
@param {int} Type of resource being monopolized


**/
Proxy.prototype.monopoly = function (resource, id, cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method monument
@param {id} ID of player with monument

**/
Proxy.prototype.monument = function (id, cb) {
};

/**
<pre>
Pre-condition: The specified building site is legal to be built on.
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method buildRoad
@param {int} ID of player building road
@param {EdgeLocation} Location of road to be built
@param {boolean} True if free, false if not

**/
Proxy.prototype.buildRoad = function (playerId, roadLocation, isFree, cb) {
};

/**
<pre>
Pre-condition: The specified building site is legal to be built on.
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method buildSettlement
@param {int} ID of player building settlement
@param {VertexLocation} Location of settlement to be built
@param {boolean} True if free, false if not

**/
Proxy.prototype.buildSettlement = function (int, location, isFree, cb) {
};

/**
<pre>
Pre-condition: There is a settlement owned by that player at specified location. Player has resources.
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method buildCity
@param {int} ID of player building city
@param {VertexLocation} Location of city to be built
@param {boolean} True if free, false if not

**/
Proxy.prototype.buildCity = function (int, location, isFree, cb) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method offerTrade
@param {int} ID of player offering trade
@param {int} ID of player who is being offered to
@param {int} Type of resource being offered.

**/
Proxy.prototype.offerTrade = function (offeringPlayerId, offeredPlayerId, resourceType) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method acceptTrade
@param {int} ID of player accepting/rejecting trade
@param {boolean} True if player accepts, false if not

**/
Proxy.prototype.acceptTrade = function (playerId, playerAccepts) {
};

/**
<pre>
Pre-condition: NONE
Post-condition: Callback is called; JSON Object containing entire game model.
</pre>
@method discardCards
@param {ID} Id of player
@param {int[]} Array of cardtypes being discarded

**/
Proxy.prototype.discardCards = function (playerId, discardedResources) {
};

