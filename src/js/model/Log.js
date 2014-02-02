
/**
This module containts functionaly for the board

@module catan.model
@namespace model
**/

module.exports = Log;

/**
Keeps track of the log
<pre>
Invariant: the log always has room for more.
</pre>
@class Log
@property entries Array Contains the entire message list
@constructor
**/
function Log(proxy, log){
	// constructor
	this.proxy = proxy;
	if(!log.lines)
		throw new Error("Invalid log format");
	this.entries = log.lines;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method mostRecentEntry
@return {Object} Log entry containing detailed log info.

**/
Log.prototype.mostRecentEntry = function () {
	return this.entries[this.entries.length-1];
};


/**
<pre>
Pre-condition: NONE
Post-condition: The log message is added at the end of the list
</pre>
(I don't think this will actually ever get called in practice. The server handles this).
@method addEntry
@param {String} Log message
@return {void}
**/
Log.prototype.addEntry = function (message) {

};

