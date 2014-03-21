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
};

Bank.prototype.withdraw = function(resource, amount){
	var a = amount || 1
	this[resource] -= a
};

Bank.prototype.deposit = function(resource, amount){
	var a = amount || 1
	this[resource] += a
};
