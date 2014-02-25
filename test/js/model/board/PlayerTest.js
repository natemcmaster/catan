var MockProxy = require('../../MockProxy.js');
var Player = require('../../../../src/js/model/board/Player.js');
var ResourceType = require('../../../../src/js/model/ResourceType.js');
var catan = require('byu-catan');
var hexgrid = catan.models.hexgrid;
var HexLocation = hexgrid.HexLocation;
var EdgeDirection = hexgrid.EdgeDirection;
var EdgeLocation = hexgrid.EdgeLocation;
var playerTestCases = require('./PlayerTestCases.json');
var assert = require('chai').assert;

suite('PlayerTests', function() {

	var canBuyTestCases = playerTestCases[0];

	suite(canBuyTestCases.suite, function() {

		canBuyTestCases.testCases.forEach(function(testCase) {

			suite(testCase.description, function() {
				var player;

				setup(function() {
					var mockProxy = new MockProxy();
					player = new Player(mockProxy, testCase.input);
				});

				test('#canBuyRoad()', function() {
					assert.equal(testCase.output.canBuyRoad, player.canBuyRoad());
				});

				test('#canBuySettlement()', function() {
					assert.equal(testCase.output.canBuySettlement, player.canBuySettlement());
				});

				test('#canBuyCity()', function() {
					assert.equal(testCase.output.canBuyCity, player.canBuyCity());
				});

				test('#canBuyDevCard()', function() {
					assert.equal(testCase.output.canBuyDevCard, player.canBuyDevCard());
				});
			});
		});
	});

	var canPlayTestCases = playerTestCases[1];

	suite(canPlayTestCases.suite, function() {

		canPlayTestCases.testCases.forEach(function(testCase) {

			suite(testCase.description, function() {
				var player;

				setup(function() {
					var mockProxy = new MockProxy();
					player = new Player(mockProxy, testCase.input);
				});

				test('#canPlayYearOfPlenty()', function() {
					assert.equal(testCase.output.canPlayYearOfPlenty, player.canPlayYearOfPlenty());
				});

				test('#canPlayMonopoly()', function() {
					assert.equal(testCase.output.canPlayMonopoly, player.canPlayMonopoly());
				});

				test('#canPlaySoldier()', function() {
					assert.equal(testCase.output.canPlaySoldier, player.canPlaySoldier());
				});

				test('#canPlayRoadBuilding()', function() {
					assert.equal(testCase.output.canPlayRoadBuilding, player.canPlayRoadBuilding());
				});
			});
		});
	});

	var canPlayMonumentTestCases = playerTestCases[2];

	suite(canPlayMonumentTestCases.suite, function() {

		canPlayMonumentTestCases.testCases.forEach(function(testCase) {

			suite(testCase.description, function() {
				var player;

				setup(function() {
					var mockProxy = new MockProxy();
					player = new Player(mockProxy, testCase.input);
				});

				test('#canPlayMonument())', function() {
					assert.equal(testCase.output.canPlayMonument, player.canPlayMonument());
				});
			});
		});
	});

	suite('functions that talk to the proxy', function() {
		var mockProxy;
		var player;
		var randomIndex = -1992;

		setup(function() {
			mockProxy = new MockProxy();
			var testData = {
				"MAX_GAME_POINTS": 10,
				"resources": {
					"brick": 14,
					"wood": 13,
					"sheep": 15,
					"wheat": 10,
					"ore": 8
				},
				"oldDevCards": {
					"yearOfPlenty": 0,
					"monopoly": 0,
					"soldier": 2,
					"roadBuilding": 0,
					"monument": 1
				},
				"newDevCards": {
					"yearOfPlenty": 0,
					"monopoly": 0,
					"soldier": 1,
					"roadBuilding": 1,
					"monument": 0
				},
				"roads": 8,
				"cities": 2,
				"settlements": 4,
				"soldiers": 1,
				"victoryPoints": 7,
				"monuments": 0,
				"longestRoad": true,
				"largestArmy": false,
				"playedDevCard": true,
				"discarded": false,
				"playerID": 71,
				"orderNumber": 0,
				"name": "Sam",
				"color": "orange"
			};
			player = new Player(mockProxy, testData, randomIndex);
		});

		test('#buyDevCard()', function() {
			var expected = {
				"type": "JSON",
				"template": {
					"type": "buyDevCard",
					"playerIndex": randomIndex
				}
			};

			player.buyDevCard();
			assert.deepEqual(expected.template, mockProxy.lastCommand.getData());
		});

		test('#yearOfPlenty()', function() {

			var resource1 = ResourceType.BRICK;
			var resource2 = ResourceType.SHEEP;

			var expected = {
				"type": "JSON",
				"template": {
					"type": "Year_of_Plenty",
					"playerIndex": randomIndex,
					"resource1": resource1,
					"resource2": resource2
				}
			};

			player.yearOfPlenty(resource1, resource2);
			assert.deepEqual(expected.template, mockProxy.lastCommand.getData());
		});

		test('#roadBuilding()', function() {

			var x1 = -4;
			var y1 = 2;
			var direction1 = EdgeDirection.S;
			var edge1 = new EdgeLocation(new HexLocation(x1, y1), direction1);

			var x2 = 3;
			var y2 = -1;
			var direction2 = EdgeDirection.N;
			var edge2 = new EdgeLocation(new HexLocation(x2, y2), direction2);

			var expected = {
				"type": "JSON",
				"template": {
					"type": "Road_Building",
					"playerIndex": randomIndex,
					"spot1": {
						"x": x1,
						"y": y1,
						"direction": "S"
					},
					"spot2": {
						"x": x2,
						"y": y2,
						"direction": "N"
					}
				}
			};

			player.roadBuilding(edge1, edge2);
			assert.deepEqual(mockProxy.lastCommand.getData(), expected.template);
		});

		test('#playSoldier()', function() {

			var victimIndex = 21;

			var x = 3;
			var y = 4;
			var hexLocation = new HexLocation(x, y);

			var expected = {
				"type": "JSON",
				"template": {
					"type": "Soldier",
					"playerIndex": randomIndex,
					"victimIndex": victimIndex,
					"robberSpot": {
						"x": x,
						"y": y
					}
				}
			};

			player.playSoldier(hexLocation, victimIndex);
			assert.deepEqual(mockProxy.lastCommand.getData(), expected.template);
		});

		test('#monopoly()', function() {

			var resourceType = ResourceType.WHEAT;

			var expected = {
				"type": "JSON",
				"template": {
					"type": "Monopoly",
					"resource": resourceType,
					"playerIndex": randomIndex
				}
			};

			player.monopoly(resourceType);
			assert.deepEqual(expected.template, mockProxy.lastCommand.getData());
		});

		test('#playMonument()', function() {

			var expected = {
				"type": "JSON",
				"template": {
					"type": "Monument",
					"playerIndex": randomIndex
				}
			};

			player.playMonument();
			assert.deepEqual(expected.template, mockProxy.lastCommand.getData());
		});

		test('#offerTrade()', function() {

			var brick = 1;
			var ore = 2;
			var sheep = 0;
			var wheat = 0;
			var wood = 10;

			var receiver = 3;

			var expected = {
				"type": "JSON",
				"template": {
					"type": "offerTrade",
					"playerIndex": randomIndex,
					"offer": {
						"brick": brick,
						"ore": ore,
						"sheep": sheep,
						"wheat": wheat,
						"wood": wood
					},
					"receiver": receiver
				}
			};

			player.offerTrade(receiver, brick, ore, sheep, wheat, wood);
			assert.deepEqual(expected.template, mockProxy.lastCommand.getData());
		});

		test('#acceptTrade()', function() {

			var willAccept = true;

			var expected = {
				"type": "JSON",
				"template": {
					"type": "acceptTrade",
					"playerIndex": randomIndex,
					"willAccept": willAccept
				}
			};

			player.acceptTrade(willAccept);
			assert.deepEqual(expected.template, mockProxy.lastCommand.getData());
		});

		test('#maritimeTrade()', function() {

			var ratio = 3;
			var inputResource = ResourceType.WHEAT;
			var outputResource = ResourceType.WOOD;

			var expected = {
				"type": "JSON",
				"template": {
					"type": "maritimeTrade",
					"playerIndex": randomIndex,
					"ratio": ratio,
					"inputResource": inputResource,
					"outputResource": outputResource
				}
			};

			player.maritimeTrade(ratio, inputResource, outputResource);
			assert.deepEqual(expected.template, mockProxy.lastCommand.getData());
		});

		test('#discardCards()', function() {

			var brick = 0;
			var ore = 2;
			var sheep = 3;
			var wheat = 1;
			var wood = 0;

			var expected = {
				"type": "JSON",
				"template": {
					"type": "discardCards",
					"playerIndex": randomIndex,
					"discardedCards": {
						"brick": brick,
						"ore": ore,
						"sheep": sheep,
						"wheat": wheat,
						"wood": wood
					}
				}
			};

			player.discardCards(brick, ore, sheep, wheat, wood);
			assert.deepEqual(expected.template, mockProxy.lastCommand.getData());
		});
	});
});