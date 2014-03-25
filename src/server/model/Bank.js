var BaseModel = require('./BaseModel');
var util = require('util');

module.exports = Bank;
util.inherits(Bank, BaseModel);

function Bank(data) {
	this.data = data || {'brick' : 19,
						 'wood' : 19,
					     'sheep' : 19,
						 'wheat' : 19,
						 'ore' : 19};
}

Bank.prototype.receivePaymentForRoad = function() {
	this.deposit('brick', 1);
	this.deposit('wood', 1);
}

Bank.prototype.receivePaymentForSettlement = function() {
	this.deposit('brick', 1);
	this.deposit('wood', 1);
	this.deposit('sheep', 1);
	this.deposit('wheat', 1);
}

Bank.prototype.receivePaymentForCity = function() {
	this.deposit('wheat', 2);
	this.deposit('ore', 3);
}

Bank.prototype.receivePaymentForDevCard = function() {
	this.deposit('sheep', 1);
	this.deposit('wheat', 1);
	this.deposit('ore', 1);
}

Bank.prototype.withdrawAsMuchAsYouCan = function(resource, amount) {
  if (amount > this.data[resource]) {
    amount = this.data[resource]
  }
  this.data[resource] -= amount
  return amount
}

Bank.prototype.canWithdraw = function(resource, amount) {
	if (this.data[resource] < amount)
		return false;
	else
		return true;
}

Bank.prototype.withdraw = function(resource, amount) {
	var a = amount || 1;

	if (this.canWithdraw(resource, a)) {
		this.data[resource] -= a;
		return true;
	}
	else {
		return false;
	}
}

Bank.prototype.canDeposit = function(resource, amount) {
	if (this.data[resource] + amount > 19)
		return false;
	else
		return true;
}

Bank.prototype.deposit = function(resource, amount) {
	var a = amount || 1;

	if (this.canDeposit(resource, a)) {
		this.data[resource] += a;
		return true;
	}
	else {
		return false;
	}
}

Bank.prototype.depositResources = function(resources) {
	for (var i in resources) {
		if (resources[i] > 0)
			this.deposit(i, resources[i]);
	}
}

Bank.prototype.getResources = function() {
	return this.data;
}

Bank.prototype.setResources = function(resources) {
	this.data = resources;
}