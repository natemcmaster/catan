var expect = require('chai').expect,
	BaseCtrl = require('../../../src/server/controllers').BaseCtrl,
	Injector = require('../../../src/common/Injector'),
	Logger = require('../../../src/server/resources').FileLogger;

var fakeResponse={
	json:function(){},
	send:function(){},
}

describe('BaseCtrl', function() {
	var ctrl;

	beforeEach(function(){
		var inj = new Injector();
		inj.register('Logger',Logger);
		ctrl = new BaseCtrl(null,inj);
	})

	it('#catches HttpError', function() {
		var op = ctrl.dynamicCall(function(q,r){
			throw new BaseCtrl.HttpError(500);
		});

	});

	it('#throws HttpErrors in JSON when XHR', function() {

	})

});