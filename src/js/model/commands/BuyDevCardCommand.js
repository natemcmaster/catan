/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');


function BuyDevCardCommand(playerID){

	this.playerID = playerID;

	BuyDevCardCommand.AbstractCommand.url = '/moves/buyDevCard';
};

BuyDevCardCommand.prototype = new AbstractCommand();

BuyDevCardCommand.prototype.getData = function(){

	return {'type':'buyDevCard',
			'playerIndex': this.playerID};
};
