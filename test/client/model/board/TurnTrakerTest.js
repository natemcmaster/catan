var assert = require('chai').assert,
	MockProxy = require('../../MockProxy'),

	TurnTraker = require('./impl').TurnTraker
	;

suite('TurnTrakerTests', function(){
	var TestTurnTraker, turnTrakerData, mockProxy;

	setup(function() {
		turnTrakerData = {
			currentTurn: 0,
			status : "Playing"
		};

		mockProxy = new MockProxy;
		TestTurnTraker = new TurnTraker(mockProxy, turnTrakerData);
	});

	suite('#currentPlayerIndex()', function(){
		test('returns correct player ID', function() {
			assert.equal(0, TestTurnTraker.currentPlayerIndex());
		});

	});

	suite('#canTradeCards()', function(){
		test('checks if given player has the right to trade cards', function() {
			assert.equal(true, TestTurnTraker.canTradeCards(0));
		});
	});

	suite('#finishTurn()', function() {
		test('it sends command to proxy', function() {

			TestTurnTraker.finishTurn();
			var expected = {
		      "playerIndex": 0,
		      "type": "finishTurn"
		    }

			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});
	});

	suite('#rollDice()', function() {
		test('it sends command to proxy', function() {

			TestTurnTraker.rollDice(6);
			var expected = {
				"number": 6,
				"playerIndex": 0,
				"type": "rollNumber"
		    }

			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});
	});





});
