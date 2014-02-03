var AbstractCommand = require('./AbstractCommand');


var playerID;
var cityLoaction;
var isFree;

function BuildCityCommand(_playerID, _cityLocation, _isFree){

	playerID = _playerID;
	cityLoaction = _cityLocation;
	isFree = _isFree;

	BuildCityCommand.AbstractCommand.url = '/moves/buildCity';
}
BuildCityCommand.prototype = new AbstractCommand();

BuildCityCommand.prototype.getData = function(){

	var returnObject = {'type':'buildCity',
						'playerIndex': playerID,
						'vertexLocation': {'x': cityLoaction.getX(),
										   'y': cityLoaction.getY(),
										   'direction': cityLoaction.getDirection()},
						'free':isFree};

	return returnObject; 
}
