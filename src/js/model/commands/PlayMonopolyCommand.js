var AbstractCommand = require('./AbstractCommand');

var playerID;
var resource;

function PlayMonopolyCommand(_playerID, _resource){

	playerID = _playerID;
	resource = _resource;	

	PlayMonopolyCommand.AbstractCommand.url = '/moves/Monopoly';
}
PlayMonopolyCommand.prototype = new AbstractCommand();

PlayMonopolyCommand.prototype.getData = function(){

	var returnObject = {'type' : 'Monopoly',
						'resource' : resource,
						'playerIndex' : playerID};

	return returnObject;

	
}
