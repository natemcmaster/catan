var AbstractCommand = require('./AbstractCommand');

var playerID;
var resource1;
var resource2;

function PlayYearOfPlentyCommand(_playerId, _resource1, _resource2){

	playerID = _playerId;
	resource1 = _resource1;
	resource2 = _resource2;

	PlayYearOfPlentyCommand.AbstractCommand.url = '/moves/Year_of_Plenty';
}
PlayYearOfPlentyCommand.prototype = new AbstractCommand();

PlayYearOfPlentyCommand.prototype.getData = function(){

	var returnObject = {'type' : 'Year_of_Plenty',
						'playerIndex' : playerID,
						'resource1' : resource1,
						'resource2' : resource2};

	return returnObject

	
}
