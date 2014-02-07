var MockProxy = require('../../MockProxy.js');
var Deck = require('../../../../src/js/model/board/Deck.js');
var assert = require('chai').assert;

suite('DeckTests', function() {

	var deck;
	var numCardsInDeck;
	var mockProxy;

	setup(function() {

		var testData = {
			"yearOfPlenty":2,
			"monopoly":2,
			"soldier":14,
			"roadBuilding":2,
			"monument":5
		};

		mockProxy = new MockProxy();
		deck = new Deck(mockProxy, testData);
		numCardsInDeck = deck.yearOfPlenty + deck.monopoly + deck.soldier + deck.roadBuilding + deck.monument;
	});

	test('#canDrawCard()', function() {
		assert.equal(true, deck.canDrawCard());
	});


	test('#drawRandomCard()', function() {
		var playerId = 543;
		var expected = {
			'type':'buyDevCard',
			'playerIndex': playerId
		};


		deck.drawRandomCard(playerId);

		assert.deepEqual(mockProxy.lastCommand.getData(), expected);

	});
});
