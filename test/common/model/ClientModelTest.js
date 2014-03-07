var MockProxy = require('../MockProxy.js');
var ClientModel = require('../../../src/common/model/clientmodel.js');
var ClientModelTestCases = require('./ClientModelTestCases.json');
var assert = require('chai').assert;

suite('ClientModelTests', function() {

	suite('#populateModels()', function() {
		var exceptions = [{
			title: 'rejects null data model',
			data: null,
			err: [TypeError,'invalid data model']
		}, {
			title: 'rejects when missing pieces',
			data: {
				revision: 0
			},
			err: [TypeError,'invalid data model']
		},
		{
			title: 'rejects invalid gameboard',
			data:{
				revision:0,
				log:{},
				chat:{}
			},
			err: [TypeError,'invalid gameboard model']
		}
		];
		exceptions.forEach(function(testCase) {
			test(testCase.title, function() {
				var clientModel = new ClientModel(0);
				assert.throws(function() {
						clientModel.populateModels(testCase.data);
					},
					testCase.err[0],testCase.err[1]);
			});
		})
	})

	suite('#canOfferTrade()', function() {
		var clientModel;
		setup(function() {
			clientModel = new ClientModel(0);
			clientModel.populateModels(ClientModelTestCases);
		});

		test('cannot give more resources than owned', function() {
			//has one too many wood in the offer
			var tradeOffer = {
				"brick": 1,
				"wood": 2,
				"sheep": 2,
				"wheat": 3,
				"ore": 1
			};
			assert.isFalse(clientModel.canOfferTrade(1, tradeOffer));
			for (var x in tradeOffer)
				tradeOffer[x]--;
			assert.isTrue(clientModel.canOfferTrade(1, tradeOffer));
		});

	});

	suite('#canAcceptTrade()', function() {
		var clientModel;
		setup(function() {
			clientModel = new ClientModel(1);
			clientModel.populateModels(ClientModelTestCases);
		});
		test('does not accept when not enough resources', function() {
			assert.isFalse(clientModel.canAcceptTrade());
		});
	});

	suite('#getMaritimeGiveOptions()', function() {
		var clientModel;
		setup(function() {
			clientModel = new ClientModel(1);
			clientModel.populateModels(ClientModelTestCases);
		});
		test('the correct resources are give options for maritime trade', function() {
			var maritimeGiveOptions = ["sheep"];
			assert.deepEqual(maritimeGiveOptions, clientModel.getMaritimeGiveOptions(clientModel.getMaritimeResourceRatios()));
		});
	});
});