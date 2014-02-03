var AbstractCommand = require('./AbstractCommand');

var playerID;
var victimID;
var robberSpot;

function PlaySoldierCommand(_playerID, _victimID, _robberSpot){

	playerID = _playerID;
	victimID = _victimID;
	robberSpot = _robberSpot;

	PlaySoldierCommand.AbstractCommand.url = '/moves/Soldier';
}
PlaySoldierCommand.prototype = new AbstractCommand();

PlaySoldierCommand.prototype.getData = function(){

	var returnObject = {'type' : 'Soldier',
						'playerIndex' : playerID,
						'victimIndex' : victimID,
						'robberSpot' : {'x' : robberSpot.getX(),
										'y' : robberSpot.getY()}
						};

	return returnObject;

	
}
