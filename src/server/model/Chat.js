
var BaseModel = require('./BaseModel')
  , util = require('util')

/**
 * @module catan.server.model
 * @namespace servermodel
 */

module.exports = Chat;
util.inherits(Chat, BaseModel);

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Chat
 * @constructor
 */
function Chat(chat){
  BaseModel.call(this, chat || {lines: []});
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: A new message is appended to the list
 * </pre>
 * @method sendChat
 * @param {string} playerName name of player sending the message
 * @param {string} message content of message
 * @return {void}
 */
Chat.prototype.sendChat = function (name, message) {
  this.data.lines.push({
    source: name,
    message: message
  })
};
