var Hex = require('./impl').Hex

  , catan = require('byu-catan')
  , HexLocation = catan.models.hexgrid.HexLocation

  , assert = require('chai').assert;

function blankVertices() {
  var v = [];
  for (var i=0; i<6; i++) {
    v.push({value: {worth: 0, ownerID: -1}})
  }
  return v;
}

function blankEdges() {
  var e = [];
  for (var i=0; i<6; i++) {
    e.push({value: {ownerID: -1}})
  }
  return e;
}

suite('HexTest',function(){
	var testData=[{
          isLand: false,
          landtype:"water",
          location: {
            "x": -3,
            "y": -3
          },
          vertexes: blankVertices(),
          "edges": blankEdges()
	}, {
          isLand: true,
          landtype:"Desert",
          location: {
            "x": -1,
            "y": -3
          },
          vertexes: blankVertices(),
          "edges": blankEdges()
  }];
  var testHex;

  setup(function(){
    testHex = [];
  	for(var x in testData) {
      var loc=testData[x].location;
  		testHex.push(new Hex(new HexLocation(loc.x, loc.y), testData[x]));
    }
	});

	suite('#isDesert()',function(){
		test('it identifies deserts correctly',function(){
			assert.isFalse(testHex[0].isDesert());
			assert.isTrue(testHex[1].isDesert());
		});
	});
  
  suite('#isLand()',function(){
    test('it works',function(){
      assert.isFalse(testHex[0].isLand());
      assert.isTrue(testHex[1].isLand());
    });
  });

});
