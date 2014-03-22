var Bank = require('../../../src/server/model/Bank.js');
var expect = require('chai').expect;

describe('Server Bank Tests', function() {
	var bank;

	before(function() {
		bank = new Bank();
	})

	beforeEach(function() {
		bank.data['brick'] = 0;
		bank.data['wood'] = 0;
		bank.data['sheep'] = 0;
		bank.data['wheat'] = 0;
		bank.data['ore'] = 0;
	})	

	it('#receivePaymentForRoad()', function() {
		bank.receivePaymentForRoad();

		expect(bank.data['brick']).to.equal(1);
		expect(bank.data['wood']).to.equal(1);
	})

	it('#receivePaymentForSettlement()', function() {
		bank.receivePaymentForSettlement();

		expect(bank.data['brick']).to.equal(1);
		expect(bank.data['wood']).to.equal(1);
		expect(bank.data['sheep']).to.equal(1);
		expect(bank.data['wheat']).to.equal(1);
	})

	it('#receivePaymentForCity()', function() {
		bank.receivePaymentForCity();

		expect(bank.data['wheat']).to.equal(2);
		expect(bank.data['ore']).to.equal(3);
	})

	it('#receivePaymentForDevCard()', function() {
		bank.receivePaymentForDevCard();

		expect(bank.data['sheep']).to.equal(1);
		expect(bank.data['wheat']).to.equal(1);
		expect(bank.data['ore']).to.equal(1);
	})

	it('#deposit() and #withdraw()', function() {
		expect(bank.deposit('brick', 20)).to.be.false;
		expect(bank.deposit('wood', 2)).to.be.true;
		expect(bank.deposit('sheep', 1)).to.be.true;
		expect(bank.deposit('ore', 3)).to.be.true;
		expect(bank.deposit('ore', 17)).to.be.false;

		expect(bank.data['brick']).to.equal(0);
		expect(bank.data['wood']).to.equal(2);
		expect(bank.data['sheep']).to.equal(1);
		expect(bank.data['wheat']).to.equal(0);
		expect(bank.data['ore']).to.equal(3);

		expect(bank.withdraw('brick', 1)).to.be.false;
		expect(bank.withdraw('wood', 1)).to.be.true;
		expect(bank.withdraw('wood', 2)).to.be.false;
		expect(bank.withdraw('sheep', 19)).to.be.false;
		expect(bank.withdraw('ore', 3)).to.be.true;

		expect(bank.data['brick']).to.equal(0);
		expect(bank.data['wood']).to.equal(1);
		expect(bank.data['sheep']).to.equal(1);
		expect(bank.data['wheat']).to.equal(0);
		expect(bank.data['ore']).to.equal(0);
	})
})
