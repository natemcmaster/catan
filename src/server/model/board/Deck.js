



function Deck(data){

	var deck = data.deck || {'yearOfPlenty': 2,
							 'monopoly': 2,
							 'soldier': 14,
							 'roadBuilding': 2,
							 'monument': 5};

	this.monopoly = deck.monopoly;
	this.monument = deck.monument;
	this.roadBuilding = deck.roadBuilding;
	this.soldier = deck.soldier;
	this.yearOfPlenty = deck.yearOfPlenty;


};

/**

	Draws a random card, Decrements from deck and returns type of 
	Card drawn so player object can be updated
**/
Deck.prototype.drawRandomCard = function(){


};

Deck.prototype.toJSON = function(){

	return {'yearOfPlenty': this.yearOfPlenty,
		    'monopoly': this.monopoly,
		    'soldier': this.soldier,
		    'roadBuilding': this.roadBuilding,
		    'monument': this.monument};

};