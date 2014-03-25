var BaseModel = require('./BaseModel');
var util = require('util');

module.exports = TurnTracker;
util.inherits(TurnTracker, BaseModel);

function TurnTracker(data) {
	this.data = data || {'status':'FirstRound',
						  'currentTurn':0};
};

var finishTurnHandlers = {
	FirstRound: function(){
		if(this.data.currentTurn >= 3){
			return 'SecondRound';
		}
		this.data.currentTurn++;
		return 'FirstRound';
	},
	SecondRound: function(){
		if(this.data.currentTurn <=0){
			return 'Rolling';
		}
		this.data.currentTurn--;
		return 'SecondRound';
	},
	Rolling: function() {
		return 'Playing';
	},
	Robbing: function() {
		return 'Playing';
	},
	Playing: function() {
		this.data.currentTurn++;
		if(this.data.currentTurn > 3){
			this.data.currentTurn = 0;
		}
		return 'Rolling';
	},
	Discarding: function() {
		return 'Discarding';
	}
}

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
	this.data.status = finishTurnHandlers[this.data.status].call(this)
};

