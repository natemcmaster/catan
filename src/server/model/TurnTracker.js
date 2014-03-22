var BaseModel = require('./BaseModel');
var util = require('util');

module.exports = TurnTracker;
util.inherits(TurnTracker, BaseModel);

function TurnTracker(data) {
	this.data = data || {'status':'FirstRound',
						  'currentTurn':0};
};

TurnTracker.prototype.setStatus = function(status){
	this.data.status = status;
};

TurnTracker.prototype.getStatus = function () {
  return this.data.status
};

TurnTracker.prototype.getCurrentPlayerIndex = function () {
  return this.data.currentTurn;
}

TurnTracker.prototype.finishTurn = function(){

	this.data.currentTurn++;

	if(this.data.currentTurn > 3){
		this.data.currentTurn = 0;
	}

	this.setStatus('Rolling');
};

