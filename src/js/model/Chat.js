
var SendChatCommand = require('./commands/SendChatCommand');

/**
 * @module catan.model
 * @namespace model
 */

module.exports = Chat;

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Chat
 * @constructor
 */
function Chat(proxy, chat){
	this.proxy = proxy;
	this.chat = chat.lines;
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: The message is sent to all players (async!)
 * </pre>
 * @method sendChat
 * @param {int} playerId id of player sending the message
 * @param {string} message content of message
 * @return {void}
 */
Chat.prototype.sendChat = function (playerId,message) {
	this.proxy.executeCommand(new SendChatCommand(playerId,message));
};

