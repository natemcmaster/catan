
var Messager = require('./Messager')
  , util = require('util')

module.exports = Chat;

util.inherits(Chat, Messager);

/**
 * Keeps track of the chat
 * <pre>
 * Invariant: the chat list always has room for more.
 * </pre>
 * @class Log
 * @property entries Array Contains the entire message list
 * @constructor
 */
function Chat(data) {
  Messager.call(this, data);
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: a new message is added to the end of the chat
 * </pre>
 * @method sendChat
 * @param {string} source name of player
 * @param {string} message content of message
 * @return {void}
 */
Chat.prototype.sendChat = function (source, message) {
  this.add(source, message)
}

