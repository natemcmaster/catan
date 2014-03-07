var Bank = require('./Bank');
var Deck = require('./Deck');
var Map = require('./map/Map');
var Player = require('./Player');
var TurnTracker = require("./TurnTraker");
var TradeOffer = require('./TradeOffer');

var RobPlayerCommand = require('../commands/RobPlayerCommand');

module.exports = GameBoard;


/**
 * <pre>
 * Invariant: The game has a full number of players. 
 * </pre>
 * GameBoard is the master model that manages all models needed to play the game
 * @constructor
 * @class GameBoard
 * @param {model.proxy} proxy Proxy responsiple for communication with the server
 */
function GameBoard(proxy, data) {
	if(!data || !data.bank || !data.map || !data.deck || !data.players)
		throw new TypeError('invalid gameboard model');
	this.proxy = proxy;
	this.bank = new Bank(proxy, data.bank);
	this.biggestArmyOwner = data.biggestArmy;
	this.deck = new Deck(proxy, data.deck);
	this.longestRoadOwner = data.longestRoad;
	this.map = new Map(proxy, data.map);
	
	var players = this.players = [];
	data.players.forEach(function(player, index){
		players.push(new Player(proxy, player, index));
	});

	this.turnTracker = new TurnTracker(proxy, data.turnTracker);
	this.winner = data.winner;
	this.tradeOffer = data.tradeOffer ? new TradeOffer(data.tradeOffer) : false;

}

/**
 * <pre>
 * Pre-condition: Id must be valid
 * Post-condition: Returns complete player information
 * </pre>
 * Get information about a player in the game.
 * @method getPlayerByID
 * @param  {int} id The id of the player
 * @return {Player}       Returns the player object
 */
GameBoard.prototype.getPlayerByID = function(id){
	return this.players.filter(function(s){
		return s.playerID == id;
	})[0];
};

/**
 * Returns the player INDEX (not ID). As indexed by the players object.
 * @param  {[type]} index Index of player
 * @return {Player}       The player responding
 */
GameBoard.prototype.getPlayerByIndex = function(index){
	return this.players[index];
}

/**
 * <pre>
 * Pre-condition: none
 * Post-condition: none
 * </pre>
 * Determines if the game is over, either due to a winner or exceptional conditions
 * @method isGameOver
 * @return {Boolean} True when the game is over
 */
GameBoard.prototype.isGameOver = function(){
	if(this.winner >= 0 && this.winner <= 3){
		return true;
	} else {
		return false;
	}
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method bigArmyOwner
@return {int} ID of player who owns the biggest army. Returns -1 if no player has largest army award. 

**/
GameBoard.prototype.bigArmyOwner = function () {
	return this.biggestArmyOwner;
};

/**
<pre>
Pre-condition: Game is over
Post-condition: Return id of player with most points
</pre>
@method getWinner
@return {int} ID of player with most points. El Conquistador!

**/
GameBoard.prototype.getWinner = function () {
	return this.winner;
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method longRoadOwner
@return {int} ID of player with the longest road. Return -1 if no player owns this award.

**/
GameBoard.prototype.longRoadOwner = function () {
	return this.longestRoadOwner;
};

/**
 * <pre>
 * Pre-condition: The game is not over. The thief is allowed to move the robber and it is their turn. ThiefId and VictimId are valid. Hex is a valid hex
 * Postcondition: Will change the card thief's and victim's card count, and move the robber location (async!)
 * </pre>
 * 
 * Moves the robber and allows the thief to steal cards
 * @method robPlayer
 * @param  {int} thiefId  The player stealing the cards
 * @param  {int} victimId The player getting stolen from
 * @param  {HexLocation} hex Where the robber is being moved to   
 * @return {null}        nothing
 */
GameBoard.prototype.robPlayer = function(thiefId, victimId, hex) {
	this.proxy.executeCommand(new RobPlayerCommand(thiefId, victimId, hex));
	
}

GameBoard.prototype.toTurnTracker = function(playerIndex){
	var p = this.players[playerIndex];
	return {
		'playerIndex': playerIndex,
		'score': p.victoryPoints,
		'highlight': (playerIndex == this.turnTracker.currentPlayerIndex()),
		'army': p.largestArmy,
		'road': p.longestRoad
	}
}