var BaseModel = require('./BaseModel');
var util = require('util');

module.exports = TurnTracker;
util.inherits(TurnTracker, BaseModel);

function TurnTracker(data) {
	this.data = data || {'status':'FirstRound',
						  'currentTurn':0};
};

TurnTracker.prototype.setStatus = function(status){
	this.status = status;
};

TurnTracker.prototype.finishTurn = function(){

	this.currentTurn++;

	if(this.currentTurn > 3){
		this.currentTurn = 0;
	}

	this.setStatus('Rolling');
};