var AbstractCommand = require('./AbstractCommand');

var playerID;

function BuyDevCardCommand(_playerID){

	playerID = _playerID;

	BuyDevCardCommand.AbstractCommand.url = '/moves/buyDevCard';
}
BuyDevCardCommand.prototype = new AbstractCommand();

BuyDevCardCommand.prototype.getData = function(){

	var returnObject = {'type':'buyDevCard',
						'playerIndex':playerID};

	return returnObject;

	
}
