var MockProxy = require('../../MockProxy.js');
var Deck = require('../../../../src/js/model/board/Deck.js');
var assert = require('chai').assert;

suite('DeckTests', function() {

	var testCases = [
		{
			'description':'deck is empty',
			'input':{'yearOfPlenty':0,'monopoly':0,'soldier':0,'roadBuilding':0,'monument':0},
			'output':false
		},
		{
			'description':'deck has one card',
			'input':{'yearOfPlenty':0,'monopoly':1,'soldier':0,'roadBuilding':0,'monument':0},
			'output':true
		},
		{
			'description':'deck has multiple cards',
			'input':{'yearOfPlenty':2,'monopoly':0,'soldier':0,'roadBuilding':2,'monument':1},
			'output':true
		},
		{
			'description':'deck is full',
			'input':{'yearOfPlenty':2,'monopoly':2,'soldier':14,'roadBuilding':2,'monument':5},
			'output':true
		}
	];

	testCases.forEach(function(testCase) {

		suite(testCase.description, function() {
			var deck;

			setup(function() {
				var mockProxy = new MockProxy();
				deck = new Deck(mockProxy, testCase.input);
			});

			test('#canDrawCard()', function() {
				assert.equal(testCase.output, deck.canDrawCard());
			});
		});
	});

	suite('functions that call proxy', function() {
		var mockProxy;
		var deck;

		setup(function() {
			mockProxy = new MockProxy();
			deck = new Deck(mockProxy, {});
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
});