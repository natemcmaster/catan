
/**
This module containts functionaly for the board

@module catan.model.board
@namespace model
**/

module.exports = Deck;

/**
<pre>
Invariant: NONE
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
Post-condition: A card will be given to the current player (async!)
</pre>
@method drawRandomCard
@return {void}
**/
Deck.prototype.drawRandomCard = function () {
};

