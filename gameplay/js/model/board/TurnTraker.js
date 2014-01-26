
/**
This module containts functionaly for the board

@module catan.model.board
@namespace model
**/

module.exports = TurnTracker;

/**
Functionality that interfaces with the system to track player turn status.

<pre>
Invariant: 
</pre>
@class TurnTracker
@constructor
**/
function TurnTracker(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method currentPlayerId
@return {int} ID of the player whose turn it is
**/
TurnTracker.prototype.currentPlayerId = function () {
	// send it
};


/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getStatus
@return {StatusEnum} State of the game (pre game, in-progress, post game)
**/
TurnTracker.prototype.getStatus = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method isGameOver
@return {boolean} True if game is over, false if not.
**/
TurnTracker.prototype.isGameOver = function () {
	// send it
};


/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canTradeCards
@param {int} playerId
@return {boolean} True if player can trade cards, false if not
**/
TurnTracker.prototype.canTradeCards = function (playerId) {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
Notifies system that a player's turn is finished

@method finishTurn
**/
TurnTracker.prototype.finishTurn = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
Rolls two "dice" using a random number generator.

@method rollDice
@return {Object} Object containing die 1 and die 2's values.

**/
TurnTracker.prototype.rollDice = function () {
	// send it
};


