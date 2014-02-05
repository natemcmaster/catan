var MockProxy = require('../../MockProxy.js');
var Deck = require('../../../../src/js/model/board/Deck.js');
var assert = require('chai').assert;

suite('Deck Tests', function() {

	var deck;
	var deckData;

	setup(function() {

		deckData = {
			"yearOfPlenty":0,
			"monopoly":0,
			"soldier":0,
			"roadBuilding":0,
			"monument":0
		};

		var mockProxy = new MockProxy();
		deck = new Deck(mockProxy, deckData);
	});

	suite('#canDrawCard()', function() {

		test('deck is empty - should return "false"', function() {
			assert.equal(false, deck.canDrawCard());
		});

		test('deck has one card - should return "true"', function() {
			deck.yearOfPlenty = 1;
			assert.equal(true, deck.canDrawCard());
		});
	});

	suite('#drawRandomCard()', function() {

		test('draw a random card');
	});
});