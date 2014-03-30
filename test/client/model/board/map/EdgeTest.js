var Edge = require('../../../../../src/client/model/board/map/Edge'),
 consts = require('../../../TestConsts').DIR,
 assert = require('chai').assert;

suite('EdgeTest',function(){

	var testEdge;

	setup(function(){
		testEdge=[];
		testEdge[0] = new Edge(consts.SOUTH,{
                "value": {
                  "ownerID": -1
                }
              });
		testEdge[1] = new Edge(consts.NORTH,{
            "value": {
              "ownerID": 2
            }
          });
	})

	test('#isOccupied()',function(){
		assert.isFalse(testEdge[0].isOccupied());
		assert.isTrue(testEdge[1].isOccupied());
	});

	test('#getHexDirection()',function(){
		assert.equal(consts.SOUTH,testEdge[0].getHexDirection());
	});

	test('#getOwner()',function(){
		assert.equal(2, testEdge[1].getOwner());
	});
});