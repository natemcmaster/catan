var MockProxy = require('../../MockProxy.js');
var Player = require('../../../../src/js/model/board/Player.js');
var assert = require('chai').assert;

suite('PlayerTests', function () {

	suite('player does not have the resources to buy anything or materials to build', function() {

		var player;

		setup (function () {
			var testData = {
				"MAX_GAME_POINTS":10,
				"resources":{
					"brick":0,
					"wood":0,
					"sheep":0,
					"wheat":0,
					"ore":0
				},
				"oldDevCards":{
					"yearOfPlenty":0,
					"monopoly":0,
					"soldier":0,
					"roadBuilding":0,
					"monument":0
				},
				"newDevCards":{
					"yearOfPlenty":0,
					"monopoly":0,
					"soldier":0,
					"roadBuilding":0,
					"monument":0
				},
				"roads":0,
				"cities":0,
				"settlements":0,
				"soldiers":0,
				"victoryPoints":0,
				"monuments":0,
				"longestRoad":true,
				"largestArmy":false,
				"playedDevCard":false,
				"discarded":false,
				"playerID":0,
				"orderNumber":0,
				"name":"Sam",
				"color":"orange"
			};

			var mockProxy = new MockProxy();
			player = new Player(mockProxy, testData);
		});

		test('#canBuyRoad()', function() {
			assert.isFalse(player.canBuyRoad());
		});

		test('#canBuySettlement()', function() {
			assert.isFalse(player.canBuySettlement());
		});

		test('#canBuyCity()', function() {
			assert.isFalse(player.canBuyCity());
		});

		test('#canBuyDevCard()', function() {
			assert.isFalse(player.canBuyDevCard());
		});
	});

	suite('player does not have the resources to buy anything but does have the materials to build', function() {

		var player;

		setup (function () {
			var testData = {
				"MAX_GAME_POINTS":10,
				"resources":{
					"brick":0,
					"wood":0,
					"sheep":0,
					"wheat":0,
					"ore":0
				},
				"oldDevCards":{
					"yearOfPlenty":0,
					"monopoly":0,
					"soldier":0,
					"roadBuilding":0,
					"monument":0
				},
				"newDevCards":{
					"yearOfPlenty":0,
					"monopoly":0,
					"soldier":0,
					"roadBuilding":0,
					"monument":0
				},
				"roads":1,
				"cities":1,
				"settlements":1,
				"soldiers":0,
				"victoryPoints":0,
				"monuments":0,
				"longestRoad":true,
				"largestArmy":false,
				"playedDevCard":false,
				"discarded":false,
				"playerID":0,
				"orderNumber":0,
				"name":"Sam",
				"color":"orange"
			};

			var mockProxy = new MockProxy();
			player = new Player(mockProxy, testData);
		});

		test('#canBuyRoad()', function() {
			assert.isFalse(player.canBuyRoad());
		});

		test('#canBuySettlement()', function() {
			assert.isFalse(player.canBuySettlement());
		});

		test('#canBuyCity()', function() {
			assert.isFalse(player.canBuyCity());
		});

		test('#canBuyDevCard()', function() {
			assert.isFalse(player.canBuyDevCard());
		});
	});

	suite('player has the resources to buy everything but does not have the materials to build', function() {

		var player;

		setup (function () {
			var testData = {
				"MAX_GAME_POINTS":10,
				"resources":{
					"brick":1,
					"wood":1,
					"sheep":1,
					"wheat":2,
					"ore":3
				},
				"oldDevCards":{
					"yearOfPlenty":0,
					"monopoly":0,
					"soldier":0,
					"roadBuilding":0,
					"monument":0
				},
				"newDevCards":{
					"yearOfPlenty":0,
					"monopoly":0,
					"soldier":0,
					"roadBuilding":0,
					"monument":0
				},
				"roads":0,
				"cities":0,
				"settlements":0,
				"soldiers":0,
				"victoryPoints":0,
				"monuments":0,
				"longestRoad":true,
				"largestArmy":false,
				"playedDevCard":false,
				"discarded":false,
				"playerID":0,
				"orderNumber":0,
				"name":"Sam",
				"color":"orange"
			};

			var mockProxy = new MockProxy();
			player = new Player(mockProxy, testData);
		});

		test('#canBuyRoad()', function() {
			assert.isFalse(player.canBuyRoad());
		});

		test('#canBuySettlement()', function() {
			assert.isFalse(player.canBuySettlement());
		});

		test('#canBuyCity()', function() {
			assert.isFalse(player.canBuyCity());
		});

		test('#canBuyDevCard()', function() {
			assert.isTrue(player.canBuyDevCard());
		});
	});

	suite('player has the resources to build everything and the materials to build', function() {

		var player;

		setup (function () {
			var testData = {
				"MAX_GAME_POINTS":10,
				"resources":{
					"brick":1,
					"wood":1,
					"sheep":1,
					"wheat":2,
					"ore":3
				},
				"oldDevCards":{
					"yearOfPlenty":0,
					"monopoly":0,
					"soldier":0,
					"roadBuilding":0,
					"monument":0
				},
				"newDevCards":{
					"yearOfPlenty":0,
					"monopoly":0,
					"soldier":0,
					"roadBuilding":0,
					"monument":0
				},
				"roads":1,
				"cities":1,
				"settlements":1,
				"soldiers":0,
				"victoryPoints":0,
				"monuments":0,
				"longestRoad":true,
				"largestArmy":false,
				"playedDevCard":false,
				"discarded":false,
				"playerID":0,
				"orderNumber":0,
				"name":"Sam",
				"color":"orange"
			};

			var mockProxy = new MockProxy();
			player = new Player(mockProxy, testData);
		});

		test('#canBuyRoad()', function() {
			assert.isTrue(player.canBuyRoad());
		});

		test('#canBuySettlement()', function() {
			assert.isTrue(player.canBuySettlement());
		});

		test('#canBuyCity()', function() {
			assert.isTrue(player.canBuyCity());
		});

		test('#canBuyDevCard()', function() {
			assert.isTrue(player.canBuyDevCard());
		});
	});
});