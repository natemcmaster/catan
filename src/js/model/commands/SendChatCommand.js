/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');



function SendChatCommand(playerID, message){
	this.playerID = playerID;
	this.message = message;

	SendChatCommand.AbstractCommand.url = '/moves/sendChat';
};

SendChatCommand.prototype = new AbstractCommand();

SendChatCommand.prototype.getData = function(){

	return {'type':'sendChat',
			'playerIndex': this.playerID.
			'content': this.message};
};