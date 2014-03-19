



function TurnTracker(data){

	var turnTracker = data.turnTracker || {'status' : 'FirstRound',
										   'currentTurn' : 0};
	this.currentTurn = turnTracker.currentTurn;

	// Status can be Discarding, Robbing, Playing, Rolling, FirstRound, SecondRound
	this.status = turnTracker.status;

};


TurnTracker.prototype.setStatus = function(status){

	this.status = status;

};

TurnTracker.prototype.nextTurn = function(){

	this.currentTurn++;

	if(this.currentTurn > 3){
		this.currentTurn = 0;
	}

};

TurnTracker.prototype.toJSON = function(){

	return {'status' : this.status,
			'currentTurn' : this.currentTurn};

}