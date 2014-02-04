var Hex=require('../../../../../src/js/model/board/map/Hex')
  , catan = require('../../../../../node_modules/byu-catan/gameplay/js/model/hexgrid.js')
  , HexLocation = catan.models.hexgrid.HexLocation
  , assert = require('chai').assert;

suite('HexTest',function(){
	var testData=[{
          "island": false,
          landtype:"wheat",
          location: {
            "x": -3,
            "y": -3
          },
          vertexes: [
            {
              "value": {
                "worth": 0,
                "ownerid": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerid": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerid": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerid": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerid": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerid": -1
              }
            }
          ],
          "edges": [
            {
              "value": {
                "ownerid": -1
              }
            },
            {
              "value": {
                "ownerid": -1
              }
            },
            {
              "value": {
                "ownerid": -1
              }
            },
            {
              "value": {
                "ownerid": -1
              }
            },
            {
              "value": {
                "ownerid": -1
              }
            },
            {
              "value": {
                "ownerid": -1
              }
            }
        ]
	}];
  var textHex=[];

  setup(function(){
    testHex=[];
  	for(var x in testData) {
      console.log(testData[i])
  		textHex.push(new Hex(new HexLocation(0, 0), testData[x]));
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
