var MockProxy = require('../../MockProxy.js');
var Bank = require('../../../../src/js/model/board/Bank.js');
var ResourceType = require('../../../../src/js/model/ResourceType.js');
var assert = require('chai').assert;
var expect = require('chai').expect;

suite('BankTests', function() {

	var testCases = [
		{
			'description':'bank has no resources',
			'input':{'brick':0,'wood':0,'sheep':0,'wheat':0,'ore':0},
			'output':{'brick':false,'wood':false,'sheep':false,'wheat':false,'ore':false},
			'getAvailableResources':[]
		},
		{
			'description':'bank has one of each resource',
			'input':{'brick':1,'wood':1,'sheep':1,'wheat':1,'ore':1},
			'output':{'brick':true,'wood':true,'sheep':true,'wheat':true,'ore':true},
			'getAvailableResources':['brick','wood','sheep','wheat','ore']
		},
		{
			'description':'bank has some resources but not others',
			'input':{'brick':0,'wood':5,'sheep':0,'wheat':0,'ore':2},
			'output':{'brick':false,'wood':true,'sheep':false,'wheat':false,'ore':true},
			'getAvailableResources':['wood','ore']
		},
		{
			'description':'bank has multiple of each resource',
			'input':{'brick':3,'wood':2,'sheep':4,'wheat':3,'ore':5},
			'output':{'brick':true,'wood':true,'sheep':true,'wheat':true,'ore':true},
			'getAvailableResources':['brick','wood','sheep','wheat','ore']
		},
		{
			'description':'bank is full',
			'input':{'brick':19,'wood':19,'sheep':19,'wheat':19,'ore':19},
			'output':{'brick':true,'wood':true,'sheep':true,'wheat':true,'ore':true},
			'getAvailableResources':['brick','wood','sheep','wheat','ore']
		}
	];

	testCases.forEach(function(testCase) {

		suite(testCase.description, function() {
			var bank;

			setup(function() {
				var mockProxy = new MockProxy();
				bank = new Bank(mockProxy, testCase.input);
			});

			test('#canWithdraw()', function() {
				assert.equal(testCase.output[ResourceType.BRICK], bank.canWithdraw(ResourceType.BRICK));
				assert.equal(testCase.output[ResourceType.WOOD], bank.canWithdraw(ResourceType.WOOD));
				assert.equal(testCase.output[ResourceType.SHEEP], bank.canWithdraw(ResourceType.SHEEP));
				assert.equal(testCase.output[ResourceType.WHEAT], bank.canWithdraw(ResourceType.WHEAT));
				assert.equal(testCase.output[ResourceType.ORE], bank.canWithdraw(ResourceType.ORE));
			});

			test('#getAvailableResources()', function() {
				//expect(testCase.getAvailableResources).to.deep.equal(bank.getAvailableResources());
				assert.deepEqual(testCase.getAvailableResources, bank.getAvailableResources());
			});
		});
	});
});