var AbstractCommand = require('./AbstractCommand');

var playerID;
var location_1;
var location_2;

function PlayRoadBuildingCommand(_playerID, _location_1, _location_2){

	playerID = _playerID;
	location_1 = _location_1;
	location_2 = _location_2;	

	PlayRoadBuildingCommand.AbstractCommand.url = '/moves/Road_Building';
}
PlayRoadBuildingCommand.prototype = new AbstractCommand();

PlayRoadBuildingCommand.prototype.getData = function(){

	var returnObject = {'type':'Road_Building',
						'playerIndex': playerID,
						'spot1': {'x': location_1.getX(),
								  'y': location_1.getY(),
								  'direction': location_1.getDirection()
								 },
						'spot2': {'x': location_2.getX(),
								  'y': location_2.getY(),
								  'direction': location_2.getDirection()
								 }
						};

	return returnObject;

	
}
