
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
	// constructor
	this.proxy = proxy;

	this.chat = chat;
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: The message is sent to all players (async!)
 * </pre>
 * @method sendChat
 * @param {string} message
 * @param {integer} user
 */
Chat.prototype.sendChat = function (message, user) {
	this.proxy.executeCommand(new SendChatCommand(message, user));
};

