var MockProxy = require('../MockProxy.js');
var ClientModel = require('../../../src/js/model/clientmodel.js');
var ClientModelTestCases = require('./ClientModelTestCases.json');
var assert = require('chai').assert;

suite('ClientModelTests', function() {


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
			for(var x in tradeOffer)
				tradeOffer[x]--;
			assert.isTrue(clientModel.canOfferTrade(1, tradeOffer));
		});

	});

	suite('#canAcceptTrade()',function(){
		var clientModel;
		setup(function() {
			clientModel = new ClientModel(1);
			clientModel.populateModels(ClientModelTestCases);
		});
		test('does not accept when not enough resources',function(){
			assert.isFalse(clientModel.canAcceptTrade());
		})
	});

});