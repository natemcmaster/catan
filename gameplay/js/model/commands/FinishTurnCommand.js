var AbstractCommand = require('./AbstractCommand');

var playerID;

function FinishTurnCommand(_playerID){

	playerID = _playerID;
	

	FinishTurnCommand.AbstractCommand.url = '/moves/finishTurn';
}
FinishTurnCommand.prototype = new AbstractCommand();

FinishTurnCommand.prototype.getData = function(){

	var returnObject = {'type' : 'finishTurn',
						'playerIndex' : playerID};

	return returnObject;
}
