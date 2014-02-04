/**
 * MapTests.js
 */

var // catan = require('../../../../../build/gameplay/js/framework.js')
 map=require('../../../../../src/js/model/board/map/Map.js')
, proxy=require('../../../MockProxy')
, assert=require('chai').assert;


suite('MapTests',function(){
	var testMap, mockProxy,testData;

	setup(function(){
		mockProxy = new MockProxy(function(){});
		testData={};
		testMap=new Map(mockProxy,testData);
	});

	suite('#tester',function(){
		test(function(){
			assert.ok();
		});
	});
});
