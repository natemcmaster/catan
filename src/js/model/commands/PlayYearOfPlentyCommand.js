/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function PlayYearOfPlentyCommand(playerId, resource1, resource2){

	this.playerID = playerId;
	this.resource1 = resource1;
	this.resource2 = resource2;

	PlayYearOfPlentyCommand.AbstractCommand.url = '/moves/Year_of_Plenty';
};

PlayYearOfPlentyCommand.prototype = new AbstractCommand();

PlayYearOfPlentyCommand.prototype.getData = function(){

	return {'type' : 'Year_of_Plenty',
			'playerIndex' : this.playerID,
			'resource1' : this.resource1,
			'resource2' : this.resource2};
};
