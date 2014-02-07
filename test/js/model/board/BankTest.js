var MockProxy = require('../../MockProxy.js');
var Bank = require('../../../../src/js/model/board/Bank.js');
var ResourceType = require('../../../../src/js/model/ResourceType.js');
var assert = require('chai').assert;

suite('BankTests', function() {

	suite('bank has no resources', function() {

		var bank;

		setup(function() {

			var testData = {
				"brick":0,
				"wood":0,
				"sheep":0,
				"wheat":0,
				"ore":0
			};

			var mockProxy = new MockProxy();
			bank = new Bank(mockProxy, testData);
		});

		test('#canWithdraw()', function() {
			assert.isFalse(bank.canWithdraw(ResourceType.BRICK));
			assert.isFalse(bank.canWithdraw(ResourceType.ORE));
			assert.isFalse(bank.canWithdraw(ResourceType.SHEEP));
			assert.isFalse(bank.canWithdraw(ResourceType.WHEAT));
			assert.isFalse(bank.canWithdraw(ResourceType.WOOD));
		});
	});

	suite('bank has one of each resource', function() {

		var bank;

		setup(function() {

			var testData = {
				"brick":1,
				"wood":1,
				"sheep":1,
				"wheat":1,
				"ore":1
			};

			var mockProxy = new MockProxy();
			bank = new Bank(mockProxy, testData);
		});

		test('#canWithdraw()', function() {
			assert.isTrue(bank.canWithdraw(ResourceType.BRICK));
			assert.isTrue(bank.canWithdraw(ResourceType.WOOD));
			assert.isTrue(bank.canWithdraw(ResourceType.SHEEP));
			assert.isTrue(bank.canWithdraw(ResourceType.WHEAT));
			assert.isTrue(bank.canWithdraw(ResourceType.ORE));
		});
	});

	suite('bank has some resources but not others', function() {

		var bank;

		setup(function() {

			var testData = {
				"brick":0,
				"wood":5,
				"sheep":0,
				"wheat":0,
				"ore":2
			};

			var mockProxy = new MockProxy();
			bank = new Bank(mockProxy, testData);
		});

		test('#canWithdraw()', function() {
			assert.isFalse(bank.canWithdraw(ResourceType.BRICK));
			assert.isTrue(bank.canWithdraw(ResourceType.WOOD));
			assert.isFalse(bank.canWithdraw(ResourceType.SHEEP));
			assert.isFalse(bank.canWithdraw(ResourceType.WHEAT));
			assert.isTrue(bank.canWithdraw(ResourceType.ORE));
		});
	});

	suite('bank has multiple of each resource', function() {

		var bank;

		setup(function() {

			var testData = {
				"brick":3,
				"wood":2,
				"sheep":4,
				"wheat":2,
				"ore":5
			};

			var mockProxy = new MockProxy();
			bank = new Bank(mockProxy, testData);
		});

		test('#canWithdraw()', function() {
			assert.isTrue(bank.canWithdraw(ResourceType.BRICK));
			assert.isTrue(bank.canWithdraw(ResourceType.WOOD));
			assert.isTrue(bank.canWithdraw(ResourceType.SHEEP));
			assert.isTrue(bank.canWithdraw(ResourceType.WHEAT));
			assert.isTrue(bank.canWithdraw(ResourceType.ORE));
		});
	});

	suite('bank is full', function() {

		var bank;

		setup(function() {

			var testData = {
				"brick":19,
				"wood":19,
				"sheep":19,
				"wheat":19,
				"ore":19
			};

			var mockProxy = new MockProxy();
			bank = new Bank(mockProxy, testData);
		});

		test('#canWithdraw()', function() {
			assert.isTrue(bank.canWithdraw(ResourceType.BRICK));
			assert.isTrue(bank.canWithdraw(ResourceType.WOOD));
			assert.isTrue(bank.canWithdraw(ResourceType.SHEEP));
			assert.isTrue(bank.canWithdraw(ResourceType.WHEAT));
			assert.isTrue(bank.canWithdraw(ResourceType.ORE));
		});
	});
});