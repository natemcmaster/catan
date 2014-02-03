/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

function AcceptTradeCommand(playerID, willAccept){

	this.playerID = playerID;
	this.willAccept = willAccept;

	AcceptTradeCommand.AbstractCommand.url = '/moves/acceptTrade';
};

AcceptTradeCommand.prototype = new AbstractCommand();

AcceptTradeCommand.prototype.getData = function(){

	return {'type':'acceptTrade',
			'playerIndex' : this.playerID,
			'willAccept' : this.willAccept};	
};