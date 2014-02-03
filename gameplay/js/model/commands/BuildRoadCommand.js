var AbstractCommand = require('./AbstractCommand');


var playerID;
var roadLoaction;
var isFree;

function BuildRoadCommand(_playerID, _roadLocation, _isFree){

	playerID = _playerID;
	roadLoaction = _roadLocation;
	isFree = _isFree;

	BuildRoadCommand.AbstractCommand.url = '/moves/buildRoad';
}
BuildRoadCommand.prototype = new AbstractCommand();

BuildRoadCommand.prototype.getData = function(){

	var returnObject = {'type':'buildRoad',
						'playerIndex': playerID,
						'vertexLocation': {'x': roadLoaction.getX(),
										   'y': roadLoaction.getY(),
										   'direction': roadLoaction.getDirection()},
						'free':isFree};

	return returnObject; 
}
