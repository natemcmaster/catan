
var Messager = require('./Messager')
  , util = require('util')

/**
 * This module containts functionality for the log
 * 
 * @module catan.server.model
 * @namespace servermodel
 */

module.exports = Log;

util.inherits(Log, Messager);

/**
 * Keeps track of the log
 * <pre>
 * Invariant: the log always has room for more.
 * </pre>
 * @class Log
 * @property entries Array Contains the entire message list
 * @constructor
 */
function Log(data) {
  Messager.call(this, data);
}

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: a new entry is added to the end of the log
 * </pre>
 * @method addEntry
 * @param {string} source name of player
 * @param {string} message content of message
 * @return {void}
 */
Log.prototype.addEntry = function (source, message) {
  this.add(source, message)
}

