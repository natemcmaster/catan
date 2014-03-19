
/**
This module containts functionality for the log

@module catan.server.model
@namespace servermodel
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
function Log(log){
	this.entries = log.lines;
};

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method mostRecentEntry
@return {Object} Log entry containing detailed log info.

**/
Log.prototype.addEntry = function (logEntry) {
	
};
