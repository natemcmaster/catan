/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function RollDiceCommand(playerID, number){

	this.playerID = playerID;
	this.number = number;

	RollDiceCommand.AbstractCommand.url = '/moves/rollNumber';
};

RollDiceCommand.prototype = new AbstractCommand();

RollDiceCommand.prototype.getData = function(){

	return {'type' : 'rollNumber',
						'playerIndex' : this.playerID,
						'number' : this.number};
};
