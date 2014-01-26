
/**
This module containts functionaly for the board

@module catan.model.board
@namespace model
**/

module.exports = Deck;

/**
<pre>
Invariant: 
</pre>
@class Deck
@constructor
**/
function Deck(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method drawRandomCard
@return {int} type of card
**/
Deck.prototype.drawRandomCard = function () {
	// send it
};