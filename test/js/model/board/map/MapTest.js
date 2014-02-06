/**
 * MapTests.js
 */

var Map = require('./impl').Map,
	MockProxy = require('../../../MockProxy'),
	assert = require('chai').assert,
	catan = require('byu-catan'),
	hexgrid = catan.models.hexgrid
	testCases = require('./MapTestCases.json'),
	mapHelpers = require('./MapHelpers');

var HexLocation = hexgrid.HexLocation;
var VertexLocation = hexgrid.VertexLocation;
var VertexDirection = hexgrid.VertexDirection;
var EdgeLocation = hexgrid.EdgeLocation;

suite('MapTests', function() {
	var testMaps, mockProxy;

	setup(function() {
		mockProxy = new MockProxy(function() {});
		testMaps = [];
		for (var x in testCases) {
			testMaps.push(new Map(mockProxy, testCases[x].data));
		}
	});

	suite('#getters', function() {
		test('it getsRobberPos', function() {
			assert.equal(testCases[0].data.robber.x, testMaps[0].getRobberPos().x);
			assert.equal(testCases[0].data.robber.y, testMaps[0].getRobberPos().y);
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
						var verloc = new VertexLocation(hexloc, catan.models.hexgrid.VertexDirection[direction])
              , res = testMaps[0].canPlaceSettlement(1, verloc)
            if (res) console.log(verloc)
						assert.isFalse(res);
					}
				}
			}
		});

		test('should allow placing next to roads with not settlement conflicts', function() {
			var dirs = ["SE", "SW", "W", "NE", "NW", "E"];
			var ownerId=1;
			var hexloc = new HexLocation(0,0);
			for (var d in VertexDirection) {
				//Use test case 1  = one hex, roads on all edges, not settlements
				assert.isTrue(testMaps[1].canPlaceSettlement(ownerId, new VertexLocation(hexloc, VertexDirection[d])));
			}
		});

	});
});
