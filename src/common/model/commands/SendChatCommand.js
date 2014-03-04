module.exports = SendChatCommand;

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
@param {int} playerIndex the index (NOT ID) of the player sending the message
@param {String} message the message to be sent
**/
function SendChatCommand(playerIndex, message) {

	this.playerIndex = playerIndex;
	this.message = message;
}

SendChatCommand.prototype = new AbstractCommand();
SendChatCommand.prototype.url = '/moves/sendChat';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
SendChatCommand.prototype.getData = function() {

	return {
		'type': 'sendChat',
		'playerIndex': this.playerIndex,
		'content': this.message
	};
}