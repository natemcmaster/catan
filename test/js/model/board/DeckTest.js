var MockProxy = require('../../MockProxy.js');
var Deck = require('../../../../src/js/model/board/Deck.js');
var assert = require('chai').assert;

suite('DeckTests', function() {

	suite('deck is empty', function() {

		var deck;

		setup(function() {

			var testData = {
				"yearOfPlenty":0,
				"monopoly":0,
				"soldier":0,
				"roadBuilding":0,
				"monument":0
			};

			var mockProxy = new MockProxy();
			deck = new Deck(mockProxy, testData);
		});

		test('#canDrawCard()', function() {
			assert.equal(false, deck.canDrawCard());
		});
	});

	suite('deck has one card', function() {

		var deck;

		setup(function() {

			var testData = {
				"yearOfPlenty":0,
				"monopoly":0,
				"soldier":0,
				"roadBuilding":1,
				"monument":0
			};

			var mockProxy = new MockProxy();
			deck = new Deck(mockProxy, testData);
		});

		test('#canDrawCard()', function() {
			assert.equal(true, deck.canDrawCard());
		});

		test('#drawRandomCard()', function() {
			deck.drawRandomCard(0);

			assert.equal(0, deck.monopoly);
			assert.equal(0, deck.monument);
			assert.equal(0, deck.roadBuilding);
			assert.equal(0, deck.soldier);
			assert.equal(0, deck.yearOfPlenty);
		});
	});

	suite('deck has multiple cards', function() {

		var deck;
		var numCardsInDeck;

		setup(function() {

			var testData = {
				"yearOfPlenty":1,
				"monopoly":2,
				"soldier":5,
				"roadBuilding":1,
				"monument":3
			};

			var mockProxy = new MockProxy();
			deck = new Deck(mockProxy, testData);
			numCardsInDeck = deck.yearOfPlenty + deck.monopoly + deck.soldier + deck.roadBuilding + deck.monument;
		});

		test('#canDrawCard()', function() {
			assert.equal(true, deck.canDrawCard());
		});

		test('#drawRandomCard()', function() {
			deck.drawRandomCard(0);
			assert.equal(numCardsInDeck - 1, deck.yearOfPlenty + deck.monopoly + deck.soldier + deck.roadBuilding + deck.monument);
		});

		test('draw another random card', function() {
			deck.drawRandomCard(0);
			assert.equal(numCardsInDeck - 2, deck.yearOfPlenty + deck.monopoly + deck.soldier + deck.roadBuilding + deck.monument);
		});
	});

	suite('deck is full', function() {

		var deck;
		var numCardsInDeck;

		setup(function() {

			var testData = {
				"yearOfPlenty":2,
				"monopoly":2,
				"soldier":14,
				"roadBuilding":2,
				"monument":5
			};

			var mockProxy = new MockProxy();
			deck = new Deck(mockProxy, testData);
			numCardsInDeck = deck.yearOfPlenty + deck.monopoly + deck.soldier + deck.roadBuilding + deck.monument;
		});

		test('#canDrawCard()', function() {
			assert.equal(true, deck.canDrawCard());
		});

		test('#drawRandomCard()', function() {
			deck.drawRandomCard(0);
			assert.equal(numCardsInDeck - 1, deck.yearOfPlenty + deck.monopoly + deck.soldier + deck.roadBuilding + deck.monument);
		});

		test('draw another random card', function() {
			deck.drawRandomCard(0);
			assert.equal(numCardsInDeck - 2, deck.yearOfPlenty + deck.monopoly + deck.soldier + deck.roadBuilding + deck.monument);
		});
	});
});