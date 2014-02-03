/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function BuildSettlementCommand(playerID, settlementLocation, isFree){

	this.playerID = playerID;
	this.settlementLoaction = settlementLocation;
	this.isFree = isFree;

	BuildSettlementCommand.AbstractCommand.url = '/moves/buildSettlement';
};

BuildSettlementCommand.prototype = new AbstractCommand();

BuildSettlementCommand.prototype.getData = function(){

	return {'type':'buildSettlement',
			'playerIndex': this.playerID,
			'vertexLocation': {'x': this.settlementLoaction.getX(),
							   'y': this.settlementLoaction.getY(),
							   'direction': this.settlementLoaction.getDirection()},
			'free': this.isFree};
};