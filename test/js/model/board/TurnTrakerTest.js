var assert = require('chai').assert,
	MockProxy = require('../../MockProxy'),

	TurnTraker = require('./impl').TurnTraker
	;

suite('TurnTrakerTests', function(){
	var TestTurnTraker;

	setup(function() {
		turnTrakerData = {
			currentTurn: 0,
			status : "Playing"
		};

		mockProxy = new MockProxy;
		TestTurnTraker = new TurnTraker(mockProxy, turnTrakerData);
	});

	suite('#currentPlayerId()', function(){
		test('returns correct player ID', function() {
			assert.equal(0, TestTurnTraker.currentPlayerId());
		});

	});





});