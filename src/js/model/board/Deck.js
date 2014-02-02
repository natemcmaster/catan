
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
function Deck(proxy, deck){
	// constructor
	this.proxy = proxy;

	this.monopoly = deck.monopoly;
	this.monument = deck.monument;
	this.roadBuilding = deck.roadBuilding;
	this.soldier = deck.soldier;
	this.yearOfPlenty = deck.yearOfPlenty;
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

