var MockProxy=require('../MockProxy.js');
var Log=require('../../../gameplay/js/model/Log.js');
var assert=require('assert');

suite('LogTests',function(){
	var log,testData;

	setup(function(){
		testData= {
			"lines": [{
				"source": "Sam",
				"message": "Sam built a road"
			},{
				"source": "Brooke",
				"message": "Brooke built a settlement"
			}]
		};
		var mockProxy=new MockProxy();
		log= new Log(mockProxy,testData);
	});

	describe('#mostRecentEntry()',function(){
		test('should return "Brooke"',function(){
			assert.equal(log.mostRecentEntry(),testData.lines[1]);
		})
		
	})



});
