var AbstractCommand = require('./AbstractCommand');

var playerID;
var victimID;
var robberSpot;

function RobPlayerCommand(_playerID, _victimID, _robberSpot){

	playerID = _playerID;
	victimID = _victimID;
	robberSpot = _robberSpot;

	RobPlayerCommand.AbstractCommand.url = '/moves/RobPlayer';
}
RobPlayerCommand.prototype = new AbstractCommand();

RobPlayerCommand.prototype.getData = function(){

	var returnObject = {'type' : 'robPlayer',
						'playerIndex' : playerID,
						'victimIndex' : victimID,
						'robberSpot' : {'x' : robberSpot.getX(),
										'y' : robberSpot.getY()}
						};

	return returnObject;

	
}
