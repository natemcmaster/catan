var BuyDevCardCommand = require("../commands/BuyDevCardCommand");
/**
This module containts functionaly for the board

@module catan.model.board
@namespace model
**/

module.exports = Deck;

/**
The deck manages development cards.

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
Post-condition: A random development card will be given to the current player (async!)
</pre>
@method drawRandomCard
@return {void}
**/
Deck.prototype.drawRandomCard = function (playerId) {
	this.proxy.executeCommand(new BuyDevCardCommand(playerId));
};

/**
<pre>
Pre-condition: NONE
Post-condition: True if player can draw a card from the deck, false otherwise
</pre>
@method canDrawCard
@return {boolean}
**/
Deck.prototype.canDrawCard = function () {
	if(this.monopoly <= 0 && this.monument <= 0 && this.roadBuilding <= 0 && this.soldier <= 0 && this.yearOfPlenty <= 0){
		return false;
	}
	else {
		return true;
	}
};

