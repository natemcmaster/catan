
var BaseModel = require('./BaseModel')
  , util = require('util')

/**
 * @module catan.server.model
 * @namespace servermodel
 */

module.exports = Messager;
util.inherits(Messager, BaseModel);

/**
 * <pre>
 * Invariant: NONE
 * </pre>
 * @class Messager
 * @constructor
 */
function Messager(chat){
  BaseModel.call(this, chat || {lines: []});
};

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: A new message is appended to the list
 * </pre>
 * @method add
 * @param {string} source name of player
 * @param {string} message content of message
 * @return {void}
 */
Messager.prototype.add = function (source, message) {
  this.data.lines.push({
    source: source,
    message: message
  })
};

