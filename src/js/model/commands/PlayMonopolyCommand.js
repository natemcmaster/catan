/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function PlayMonopolyCommand(playerID, resource){

	this.playerID = playerID;
	this.resource = resource;	

	PlayMonopolyCommand.AbstractCommand.url = '/moves/Monopoly';
};

PlayMonopolyCommand.prototype = new AbstractCommand();

PlayMonopolyCommand.prototype.getData = function(){

	return {'type' : 'Monopoly',
						'resource' : this.resource,
						'playerIndex' : this.playerID};
};
