/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@class SendChatCommand
@constructor 
@param {int} the ID of the player sending the message
@param {String} the message to be sent
**/
function SendChatCommand(playerID, message){
	this.playerID = playerID;
	this.message = message;

	SendChatCommand.AbstractCommand.url = '/moves/sendChat';
}

SendChatCommand.prototype = new AbstractCommand();
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
SendChatCommand.prototype.getData = function(){

	var returnObject = {'type':'sendChat',
						'playerIndex': playerID,
						'content': message};

	return returnObject;

	
}
