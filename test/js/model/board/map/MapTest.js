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
			testMaps.push(new Map(mockProxy, testCases[x]));
		}
	});

	suite('#getters', function() {
		test.skip('it getsHexAt with coordinates', function() {
      // what??
			assert.equal(testCases[0].hexGrid.hexes, testMaps[0].getHexAt(0, -3));
		});
		test('it getsRobberPos', function() {
			assert.equal(testCases[0].robber.x, testMaps[0].getRobberPos().x);
			assert.equal(testCases[0].robber.y, testMaps[0].getRobberPos().y);
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

  suite('#canPlaceRoad()', function () {
    test('should disallow where no connecting roads exist', function () {
      var loc = new EdgeLocation(new HexLocation(0, 0), 1)
      assert.isFalse(testMaps[0].canPlaceRoad(0, loc));
    })
  })

  suite('#canPlaceSettlement()', function () {
    test('should disallow where no connecting roads exist', function () {
      var loc = new EdgeLocation(new HexLocation(0, 0), 1)
      assert.isFalse(testMaps[0].canPlaceSettlement(0, loc));
    })
  })

  suite('#canPlaceCity()', function () {
    test('should disallow where no connecting settlement exists', function () {
      var loc = new EdgeLocation(new HexLocation(0, 0), 1)
      assert.isFalse(testMaps[0].canPlaceCity(0, loc));
    })
  })

  suite('#portsForPlayer()', function () {
    test('should report no ports for player 0', function () {
      assert.equal(testMaps[0].portsForPlayer(0), 0);
    })
  })

	suite('#canPlaceSettlement()', function() {
		test('should not allow anywhere on ', function() {
			for (var y = -3; y <= 3; y++) {
				for (var x = mapHelpers.gridMinX(y); x < mapHelpers.gridMaxX(y); x++) {
					var hexloc = new HexLocation(x, y);
					for (var direction in catan.models.hexgrid.VertexDirection) {
						var verloc = new VertexLocation(hexloc, catan.models.hexgrid.VertexDirection[direction]);
						assert.isFalse(testMaps[0].canPlaceSettlement(1, verloc));
					}
				}
			}
		});

    /* Again, the canPlaceCity is much more limited than this. I don't think
     * these tests are necessary.
		function testCityFalseEdges(xs, ys, dirs) {
			for (var x in xs) {
				for (var y in ys) {
					var hexloc = new HexLocation(xs[x], ys[y]);
					for (var d in dirs) {
						assert.isFalse(testMaps[0].canPlaceCity(1, new VertexLocation(hexloc, VertexDirection[d])));
					}
				}
			}
		}

		test('should not allow bottom edge', function() {
			testCityFalseEdges([-3, -2, -1, 0], [3], ["SE", "SW", "W"]);
		});

		test('should not allow top edge', function() {
			testCityFalseEdges([0,1,2,3], [-3], ["NE", "NW", "E"]);
		});

		test('should not allow right edge', function() {
			testCityFalseEdges([3],[-3, -2, -1, 0], ["SE", "NE", "E"]);
		});

		test('should not allow bottom edge', function() {
			testCityFalseEdges([-3],[0,1,2,3], ["NW", "SW", "W"]);
		});
    */

	});
});
