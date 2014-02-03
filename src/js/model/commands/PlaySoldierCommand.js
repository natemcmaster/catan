/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function PlaySoldierCommand(playerID, victimID, robberSpot){

	this.playerID = playerID;
	this.victimID = victimID;
	this.robberSpot = robberSpot;

	PlaySoldierCommand.AbstractCommand.url = '/moves/Soldier';
};

PlaySoldierCommand.prototype = new AbstractCommand();

PlaySoldierCommand.prototype.getData = function(){

	return {'type' : 'Soldier',
			'playerIndex' : this.playerID,
			'victimIndex' : this.victimID,
			'robberSpot' : {'x' : this.robberSpot.getX(),
							'y' : this.robberSpot.getY()}
			};	
};
