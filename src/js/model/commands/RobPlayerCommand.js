/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function RobPlayerCommand(playerID, victimID, robberSpot){

	this.playerID = playerID;
	this.victimID = victimID;
	this.robberSpot = robberSpot;

	RobPlayerCommand.AbstractCommand.url = '/moves/RobPlayer';
};

RobPlayerCommand.prototype = new AbstractCommand();

RobPlayerCommand.prototype.getData = function(){

	return {'type' : 'robPlayer',
			'playerIndex' : this.playerID,
			'victimIndex' : this.victimID,
			'robberSpot' : {'x' : this.robberSpot.getX(),
							'y' : this.robberSpot.getY()}
			};
};
