var Hex=require('../../../../../src/js/model/board/map/Hex');

suite('HexTest',function(){
	var testData=[{
          "isLand": false,
          landType:"wheat",
          location: {
            "x": -3,
            "y": -3
          },
          vertexes: [
            {
              "value": {
                "worth": 0,
                "ownerID": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerID": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerID": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerID": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerID": -1
              }
            },
            {
              "value": {
                "worth": 0,
                "ownerID": -1
              }
            }
          ],
          "edges": [
            {
              "value": {
                "ownerID": -1
              }
            },
            {
              "value": {
                "ownerID": -1
              }
            },
            {
              "value": {
                "ownerID": -1
              }
            },
            {
              "value": {
                "ownerID": -1
              }
            },
            {
              "value": {
                "ownerID": -1
              }
            },
            {
              "value": {
                "ownerID": -1
              }
            }
        ]
	},
	{
		isLand:true,
		landType:"Desert",
		vertexes:[{value:{worth:0,ownerID:-1}}],
		edges:[{value:{ownerID:-1}}]
	}];
  var textHex=[];

  setup(function(){
    testHex=[];
  	for(var x in testData){
      var loc=testData[x].location;
      var hex=new Hex(new catan.model.hexgrid.HexLocation(loc.x,loc.y));
      hex.populateFromJson(testData[x]);
  		textHex.push();
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