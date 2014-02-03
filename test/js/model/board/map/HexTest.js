var Hex=require('../../../../../src/js/model/board/map/Hex');

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
	},
	{
		isLand:true,
		landType:"Desert",
		vertexes:[],
		edges:[{value:{ownerID:-1}}]
	}];
  var textHex=[];

  setup(function(){
    testHex=[];
  	for(var x in testData)
  		textHex.push(new Hex(testData[x]));

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