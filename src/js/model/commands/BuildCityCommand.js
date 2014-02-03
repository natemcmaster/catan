/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function BuildCityCommand(playerID, cityLocation, isFree){

	this.playerID = playerID;
	this.cityLoaction = cityLocation;
	this.isFree = isFree;

	BuildCityCommand.AbstractCommand.url = '/moves/buildCity';
};

BuildCityCommand.prototype = new AbstractCommand();

BuildCityCommand.prototype.getData = function(){

	return {'type':'buildCity',
			'playerIndex': this.playerID,
			'vertexLocation': {'x': this.cityLoaction.getX(),
							   'y': this.cityLoaction.getY(),
							   'direction': this.cityLoaction.getDirection()},
			'free': this.isFree};
};