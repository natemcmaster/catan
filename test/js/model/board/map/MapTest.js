/**
 * MapTests.js
 */

var Map = require('./impl').Map,
	MockProxy = require('../../../MockProxy'),
	assert = require('chai').assert,
  catan = require('byu-catan'),
	testCases = require('./MapTestCases.json'),
	mapHelpers = require('./MapHelpers');

var HexLocation = catan.models.hexgrid.HexLocation;
var VertexLocation = catan.models.hexgrid.VertexLocation;
var VertexDirection = catan.models.hexgrid.VertexDirection;

suite.skip('MapTests', function() {
	var testMaps, mockProxy;

	setup(function() {
		mockProxy = new MockProxy(function() {});
		testMaps = [];
		for (var x in testCases) {
			testMaps.push(new Map(mockProxy, testCases[x]));
		}
	});

	suite('#getters', function() {
		test('it getsHexAt with coordinates', function() {
			assert.equal(testCases[0].hexGrid.hexes, testMap[0].getHexAt(0, -3));
		});
		test('it getsRobberPos', function() {
			assert.equal(testCases[0].robber.x, testMap[0].getRobberPos().x);
			assert.equal(testCases[0].robber.y, testMap[0].getRobberPos().y);
		});
	});

	suite('#canPlaceRobber()', function() {
		test('should not allow placement on water tiles', function() {
			for (var y = -3; y <= 3; y++) {
				for (var x = mapHelpers.gridMinX(y); x < mapHelpers.girdMaxX(y); x++) {
					if (isGridEdge(x, y)) {
						assert.isFalse(testMap[0].canPlaceRobber(1, new HexLocation(x, y)));
					} else {
						assert.isTrue(testMap[0].canPlaceRobber(1, new HexLocation(x, y)));
					}
				}
			}
		});
	});

	suite('#canPlaceCity()', function() {
		test('should allow all inside hexes', function() {
			for (var y = -3; y <= 3; y++) {
				for (var x = mapHelpers.gridMinX(y); x < mapHelpers.girdMaxX(y); x++) {
					var hexloc = new HexLocation(x, y);

					// allow all inside
					if (!isGridEdge(x, y)) {

						for (var x in catan.models.hexgrid.VertexDirection) {
							var verloc = new VertexLocation(hexloc, catan.models.hexgrid.VertexDirection[x]);
							assert.isTrue(testMap[0].canPlaceCity(1, verloc));
						}

					}
				}
			}
		});

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

	});
});
