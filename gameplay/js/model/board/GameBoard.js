/**
This module containts functionaly for the board

@module catan.model.board
@namespace model
**/

module.exports = GameBoard;

/**
 * The bank of unused cards
 * @type {model.Bank}
 * @property bank
 */
var bank = require('./Bank');

/**
 * The deck of development cards
 * @type {model.Deck}
 * @property deck
 */
var deck = require('./Deck');

/**
 * The map
 * @type {model.Map}
 * @property map
 */
var map = require('./Map');

/**
 * The collection of all players
 * @type {Array}
 * @property players
 */
require('./Player');
var players = [];

/**
 * The turn tracker
 * @type {model.TurnTracker}
 * @property turnTracker
 */
var turnTracker = require("./TurnTraker");


/**
 * GameBoard is the master model that manages all models needed to play the game
 * @constructor
 * @class GameBoard
 * @param {model.proxy} proxy Proxy responsiple for communication with the server
 */
function GameBoard(proxy){
	this.proxy = proxy;

}

/**
 * <pre>
 * Pre-condition: Id must be valid
 * Post-condition: Returns complete player information
 * </pre>
 * Get information about a player in the game.
 * @method getPlayer
 * @param  {int} id The id of the player
 * @return {Player}       Returns the player object
 */
GameBoard.prototype.getPlayerById = function(id){

};


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
	// send it
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
	// send it
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
	// send it
};

/**
 * <pre>
 * Pre-condition: The thief is allowed to move the robber. ThiefId and VictimId are valid. Hex is a valid hex
 * Postcondition: Will change the card thief's and victim's card count, and move the robber location
 * </pre>
 * 
 * Moves the robber and allows the thief to steal cards
 * @method robPlayer
 * @param  {int} thiefId  The player stealing the cards
 * @param  {int} victimId The player getting stolen from
 * @param  {Hex} hex Where the robber is being moved to   
 * @return {null}        nothing
 */
GameBoard.prototype.robPlayer = function(thiefId,victimId,hex) {
	
}
