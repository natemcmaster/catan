var MockProxy = require('../../MockProxy.js');
var Player = require('../../../../src/js/model/board/Player.js');
var ResourceType = require('../../../../src/js/model/ResourceType.js');
var catan = require('byu-catan');
var hexgrid = catan.models.hexgrid;
var HexLocation = hexgrid.HexLocation;
var EdgeDirection = hexgrid.EdgeDirection;
var EdgeLocation = hexgrid.EdgeLocation;
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

	suite('player does not have any development cards', function() {
		
		var player;
		var testData;

		setup (function () {
			testData = {
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

		test('#playableDevelopmentCards()', function() {
			assert.equal(testData.oldDevCards, player.playableDevelopmentCards());
		});
	});

	suite('functions that talk to the proxy', function() {
		var mockProxy;
		var player;

		setup(function() {
			mockProxy = new MockProxy();
			player = new Player(mockProxy, {});
			player.playerID = 153;
		});

		test('#buyDevCard()', function() {

			var expected = {
				"type": "JSON",
        		"template": {
            		"type": "buyDevCard",
            		"playerIndex": player.playerID
        			}
        		};

        	player.buyDevCard();
        	assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});		

		test('#yearOfPlenty()', function() {
			
			var resource1 = ResourceType.BRICK;
			var resource2 = ResourceType.SHEEP;

			var expected = {
				"type": "JSON",
		        "template": {
		            "type": "Year_of_Plenty",
		            "playerIndex": player.playerID,
		            "resource1": resource1,
		            "resource2": resource2
		        }
        	};

        	player.yearOfPlenty(resource1, resource2);
        	assert.deepEqual(expected, mockProxy.lastCommand.getData());
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
		            "playerIndex": player.playerID,
		            "spot1": {
		                "x": x1,
		                "y": y1,
		                "direction": direction1
		            },
		            "spot2": {
		                "x": x2,
		                "y": y2,
		                "direction": direction2
		            }
		        }
        	};

        	player.roadBuilding(edge1, edge2);
        	assert.deepEqual(expected, mockProxy.lastCommand.getData());
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
		            "playerIndex": player.playerID,
		            "victimIndex": victimIndex,
		            "robberSpot": {
		                "x": x,
		                "y": y
		            }
        		}
        	};

        	player.playSoldier(hexLocation, victimIndex);
        	assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});

		test('#monopoly()', function() {
			
			var resourceType = ResourceType.WHEAT;

			var expected = {
				"type": "JSON",
		        "template": {
		            "type": "Monopoly",
		            "resource": resourceType,
		            "playerIndex": player.playerID
		        }
			};

			player.monopoly(resourceType);
			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});

		test('#monument()', function() {

			var expected = {
				"type": "JSON",
		        "template": {
		            "type": "Monument",
		            "playerIndex": player.playerID
		        }
			};

			player.monument();
			assert.deepEqual(expected, mockProxy.lastCommand.getData());
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
		            "playerIndex": player.playerID,
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
			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});

		test('#acceptTrade()', function() {

			var willAccept = true;

			var expected = {
				"type": "JSON",
		        "template": {
		            "type": "acceptTrade",
		            "playerIndex": player.playerID,
		            "willAccept": willAccept
		        }
			};

			player.acceptTrade(willAccept);
			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});

		test('#maritimeTrade()', function() {

			var ratio = 3;
			var inputResource = ResourceType.WHEAT;
			var outputResource = ResourceType.WOOD;

			var expected = {
				"type": "JSON",
        		"template": {
            		"type": "maritimeTrade",
		            "playerIndex": player.playerID,
		            "ratio": ratio,
		            "inputResource": inputResource,
		            "outputResource": outputResource
		        }
		    };

		    player.maritimeTrade(ratio, inputResource, outputResource);
		    assert.deepEqual(expected, mockProxy.lastCommand.getData());
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
		            "playerIndex": player.playerID,
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
			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});
	});
});