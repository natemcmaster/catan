
/**
This module containts functionaly for the board

@module catan.model.board
@namespace model
**/

module.exports = GameBoard;

/**
This class containts funtionality for the board 
<pre>
Invariant: 
</pre>
@class GameBoard
@constructor
**/
function GameBoard(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getPlayer
@param {int} Player at given index
@return {Object} Player data

**/
GameBoard.prototype.getPlayer = function (index) {
	// send it
};


/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method isNewGame
@return {boolean} True if new game, false if not.

**/
GameBoard.prototype.isNewGame = function (index) {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method bigArmyOwner
@return {int} ID of player who owns the biggest army. Returns 0 if no player has largest army.

**/
GameBoard.prototype.bigArmyOwner = function () {
	// send it
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getWinner
@return {int} ID of player who won the game. El Conquistador!

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
@return {int} ID of player with the longest road.

**/
GameBoard.prototype.longRoadOwner = function () {
	// send it
};

/**
Player A may rob player B by placing the robber on a certain hex.

<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method robPlayer
@param {int} ID of player who is initiating the robbery.
@param {int} ID of player who is being robbed. #hardtimes
@param {Object} Object containing x,y coordinates of hex to place robber 

**/
GameBoard.prototype.robPlayer = function (thief, victim, hex) {
	// send it
};




