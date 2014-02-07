/**
 * MapTests.js
 */

var Map = require('./impl').Map,
	MockProxy = require('../../../MockProxy'),
	assert = require('chai').assert,
	catan = require('byu-catan'),
	hexgrid = catan.models.hexgrid,
	testCases = require('./MapTestCases.json'),
	mapHelpers = require('./MapHelpers'),
	Hex = require('./impl').Hex;

var HexLocation = hexgrid.HexLocation;
var VertexLocation = hexgrid.VertexLocation;
var VertexDirection = hexgrid.VertexDirection;
var EdgeLocation = hexgrid.EdgeLocation;
var EdgeDirection = hexgrid.EdgeDirection;

suite('MapTests', function() {
	var testMaps, mockProxy;

	setup(function() {
		mockProxy = new MockProxy;
		testMaps = [];
		for (var x in testCases) {
			testMaps.push(new Map(mockProxy, testCases[x].data));
		}
	});

	suite('#getRobberPos()', function() {
		test('it returns correct location', function() {
			assert.equal(testCases[0].data.robber.x, testMaps[0].getRobberPos().x);
			assert.equal(testCases[0].data.robber.y, testMaps[0].getRobberPos().y);
		});
	});

	suite('#getHexAt',function(){
		//because I don't trust this not to break. Again.
		test('it gets a hex',function(){
			var expected=new Hex(new HexLocation(0,0),testCases[1].data.hexGrid.hexes[0][0]);
			assert.deepEqual(expected, testMaps[1].getHexAt(0,0));
		});
	});

	suite('#canPlaceRobber()', function() {
		test('should not allow placement on water tiles', function() {
			for (var y = -3; y <= 3; y++) {
				for (var x = mapHelpers.gridMinX(y); x < mapHelpers.gridMaxX(y); x++) {
					if (mapHelpers.isGridEdge(x, y)) {
						assert.isFalse(testMaps[0].canPlaceRobber(1, new HexLocation(x, y)));
					}
				}
			}
		});
	});

	suite('#canPlaceRoad()', function() {
		test('should disallow where no connecting roads exist', function() {
			var loc = new EdgeLocation(new HexLocation(0, 0), 1)
			assert.isFalse(testMaps[0].canPlaceRoad(0, loc));
		})
	});

	suite('#canPlaceSettlement()', function() {
		test('should disallow where no connecting roads exist', function() {
			var loc = new EdgeLocation(new HexLocation(0, 0), 1)
			assert.isFalse(testMaps[0].canPlaceSettlement(0, loc));
		})
	});

	suite('#canPlaceCity()', function() {
		test('should disallow where no connecting settlement exists', function() {
			var loc = new EdgeLocation(new HexLocation(0, 0), 1)
			assert.isFalse(testMaps[0].canPlaceCity(0, loc));
		})
	});

	suite('#portsForPlayer()', function() {
		test('should report one port for player 0', function() {
			var ports = testMaps[0].portsForPlayer(0);
			assert.equal(1, ports.length);
		})
	});

	suite('#canPlaceSettlement()', function() {
		test('should not allow anywhere on an empty map', function() {
			for (var y = -3; y <= 3; y++) {
				for (var x = mapHelpers.gridMinX(y); x < mapHelpers.gridMaxX(y); x++) {
					var hexloc = new HexLocation(x, y);
					for (var direction in catan.models.hexgrid.VertexDirection) {
						var verloc = new VertexLocation(hexloc, catan.models.hexgrid.VertexDirection[direction]),
							res = testMaps[0].canPlaceSettlement(1, verloc)
							if (res) console.log(verloc)
							assert.isFalse(res);
					}
				}
			}
		});

		test('should allow placing next to roads with not settlement conflicts', function() {
			var dirs = ["SE", "SW", "W", "NE", "NW", "E"];
			var ownerId = 1;
			var hexloc = new HexLocation(0, 0);
			for (var d in VertexDirection) {
				//Use test case 1  = one hex, roads on all edges, not settlements
				assert.isTrue(testMaps[1].canPlaceSettlement(ownerId, new VertexLocation(hexloc, VertexDirection[d])));
			}
		});

	});

	suite('#getOwnedEdges()', function() {
		test('should return edges that have an owner', function() {
			assert.equal(6, testMaps[1].getOwnedEdges().length);
			assert.equal(4, testMaps[2].getOwnedEdges().length);
		});
	});

	suite('#getOwnedVertices()', function() {
		test('should return vertices that have an owner', function() {
			assert.equal(0, testMaps[1].getOwnedVertices().length);
			assert.equal(6, testMaps[2].getOwnedVertices().length);
		});
	});

	suite('other getters',function(){
		test('#getNumbers()',function(){
			assert.isDefined(testMaps[0].getNumbers());
		});
		test('#getAllHexes()',function(){
			assert.equal(37,testMaps[0].getAllHexes().length);
			assert.equal(1,testMaps[1].getAllHexes().length);
		});
	});


	/** 
	 * Integration tests
	 */

	suite('#placeRoad()', function() {
		test('it sends BuildRoad command to proxy', function() {
			var playerId = 1,
				x = 0,
				y = 0,
				dir = EdgeDirection.N;

			testMaps[0].placeRoad(playerId, new EdgeLocation(new HexLocation(x, y), dir));
			var expected = {
				'type': 'buildRoad',
				'playerIndex': playerId,
				'edgeLocation': {
					'x': x,
					'y': y,
					'direction': EdgeDirection.N
				},
				'free': true
			};

			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});
	});

	suite('#placeRoads() (plural)', function() {
		test('it sends RoadBuilding command to proxy', function() {
			var playerId = 1,
				x = 0,
				y = 0,
				dir1 = EdgeDirection.N,
				dir2 = EdgeDirection.S;

			testMaps[0].placeRoads(playerId, [
				new EdgeLocation(new HexLocation(x, y), dir1),
				new EdgeLocation(new HexLocation(x, y), dir2)
			]);
			var expected = {
				'type': 'Road_Building',
				'playerIndex': playerId,
				'spot1': {
					'x': x,
					'y': y,
					'direction': dir1
				},
				'spot2': {
					'x': x,
					'y': y,
					'direction': dir2
				}
			};

			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});
	});


	suite('#placeSettlement()', function() {
		test('it sends BuildSettlement command to proxy', function() {
			var playerId = 1,
				x = 0,
				y = 0,
				dir = VertexDirection.NE;

			testMaps[0].placeSettlement(playerId, new VertexLocation(new HexLocation(x, y), dir));
			var expected = {
				'type': 'buildSettlement',
				'playerIndex': playerId,
				'vertexLocation': {
					'x': x,
					'y': y,
					'direction': dir
				},
				'free': true
			};

			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});
	});

	suite('#placeCity()', function() {
		test('it sends command to proxy', function() {
			var playerId = 1,
				x = 0,
				y = 0,
				dir = VertexDirection.NE;

			testMaps[0].placeCity(playerId, new VertexLocation(new HexLocation(x, y), dir));
			var expected = {
				'type': 'buildCity',
				'playerIndex': playerId,
				'vertexLocation': {
					'x': x,
					'y': y,
					'direction': dir
				},
				'free': true
			};

			assert.deepEqual(expected, mockProxy.lastCommand.getData());
		});
	});

});