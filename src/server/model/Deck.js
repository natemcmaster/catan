var BaseModel = require('./BaseModel');
var util = require('util');

module.exports = Deck;
util.inherits(Deck, BaseModel);

function Deck(data) {
	this.data = data || {'yearOfPlenty': 2,
						 'monopoly': 2,
						 'soldier': 14,
						 'roadBuilding': 2,
						 'monument': 5};
};

/**

	Draws a random card, Decrements from deck and returns type of 
	Card drawn so player object can be updated
**/
Deck.prototype.drawRandomCard = function() {
	var type = getRandomInt(0, 4);

	while (this.data[type] == 0)
	{
		type = getRandomInt(0, 4);
	}

	this.data[type]--;
	
	return this.data[type].name;
};
