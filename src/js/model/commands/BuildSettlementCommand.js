var AbstractCommand = require('./AbstractCommand');


var playerID;
var settlementLoaction;
var isFree;

function BuildSettlementCommand(_playerID, _settlementLocation, _isFree){

	playerID = _playerID;
	settlementLoaction = _settlementLocation;
	isFree = _isFree;

	BuildSettlementCommand.AbstractCommand.url = '/moves/buildSettlement';
}
BuildSettlementCommand.prototype = new AbstractCommand();

BuildSettlementCommand.prototype.getData = function(){

	var returnObject = {'type':'buildSettlement',
						'playerIndex': playerID,
						'vertexLocation': {'x': settlementLoaction.getX(),
										   'y': settlementLoaction.getY(),
										   'direction': settlementLoaction.getDirection()},
						'free':isFree};

	return returnObject; 
}

