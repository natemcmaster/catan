/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function BuildRoadCommand(playerID, roadLocation, isFree){

	this.playerID = playerID;
	this.roadLoaction = roadLocation;
	this.isFree = isFree;

	BuildRoadCommand.AbstractCommand.url = '/moves/buildRoad';
};

BuildRoadCommand.prototype = new AbstractCommand();

BuildRoadCommand.prototype.getData = function(){

	return {'type':'buildRoad',
			'playerIndex': this.playerID,
			'vertexLocation': {'x': this.roadLoaction.getX(),
							   'y': this.roadLoaction.getY(),
							   'direction': this.roadLoaction.getDirection()},
			'free':this.isFree};
};
