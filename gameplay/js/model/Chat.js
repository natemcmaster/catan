
/**
 * @module catan.model
 * @namespace model
 */

module.exports = Chat;

// anything in this "global" scope is actually namespaced. But make sure to use var.
//var x = 5;

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Chat
 * @constructor
 */
function Chat(proxy){
	// constructor
	this.proxy = proxy;
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
};

