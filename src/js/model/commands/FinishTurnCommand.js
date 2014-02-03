/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function FinishTurnCommand(playerID){

	this.playerID = playerID;
	

	FinishTurnCommand.AbstractCommand.url = '/moves/finishTurn';
};

FinishTurnCommand.prototype = new AbstractCommand();

FinishTurnCommand.prototype.getData = function(){

	return {'type' : 'finishTurn',
			'playerIndex' : this.playerID};

};