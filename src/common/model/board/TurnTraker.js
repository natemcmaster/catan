var RollDiceCommand = require("../commands/RollDiceCommand");
var FinishTurnCommand = require("../commands/FinishTurnCommand");

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
function TurnTracker(proxy, turnTracker){
	// constructor
	this.proxy = proxy;
	
	this.currentTurn = turnTracker.currentTurn;

	// Status can be Discarding, Robbing, Playing, Rolling, FirstRound, SecondRound
	this.status = turnTracker.status;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method currentPlayerIndex
@return {int} ID of the player whose turn it is
**/
TurnTracker.prototype.currentPlayerIndex = function () {
	return this.currentTurn;
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method canTradeCards
@param {int} playerIndex
@return {boolean} True if player can trade cards, false if not
**/
TurnTracker.prototype.canTradeCards = function (playerIndex) {
	return this.status == "Playing" && playerIndex == this.currentTurn;
};


/**
<pre>
Pre-condition: The player can end their turn
Post-condition: The next person in order starts their turn. (async!)
</pre>
Notifies system that a player's turn is finished

@method finishTurn
@return {void}
**/
TurnTracker.prototype.finishTurn = function () {
	this.proxy.executeCommand(new FinishTurnCommand(this.currentTurn));
};

/**
<pre>
Pre-condition: NONE
Post-condition: Players will be given the resources deserved from that roll. ClientModel's state is either "robbing", "discarding", or "playing" (async!)
</pre>
Rolls two "dice" using a random number generator.

@method rollDice
@return {void}
**/
TurnTracker.prototype.rollDice = function (number) {
	this.proxy.executeCommand(new RollDiceCommand(this.currentTurn, number));
};


