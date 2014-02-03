var AbstractCommand = require('./AbstractCommand');

var playerID;
var number;

function RollDiceCommand(_playerID, _number){

	playerID =_playerID;
	number =_number;

	RollDiceCommand.AbstractCommand.url = '/moves/rollNumber';
}
RollDiceCommand.prototype = new AbstractCommand();

RollDiceCommand.prototype.getData = function(){

	var returnObject = {'type' : 'rollNumber',
						'playerIndex' : playerID,
						'number' : number};

	return returnObject;
}
