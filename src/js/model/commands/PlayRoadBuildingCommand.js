/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function PlayRoadBuildingCommand(playerID, location_1, location_2){

	this.playerID = playerID;
	this.location_1 = location_1;
	this.location_2 = location_2;	

	PlayRoadBuildingCommand.AbstractCommand.url = '/moves/Road_Building';
};

PlayRoadBuildingCommand.prototype = new AbstractCommand();

PlayRoadBuildingCommand.prototype.getData = function(){

	return {'type':'Road_Building',
			'playerIndex': this.playerID,
			'spot1': {'x': this.location_1.getX(),
					  'y': this.location_1.getY(),
					  'direction': this.location_1.getDirection()
					 },
			'spot2': {'x': this.location_2.getX(),
					  'y': this.location_2.getY(),
					  'direction': this.location_2.getDirection()
					 }
			};
};
