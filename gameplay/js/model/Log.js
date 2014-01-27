
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
@constructor
**/
function Log(proxy){
	// constructor
	this.proxy = proxy;
}

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method mostRecentEntry
@return {Object} Log entry containing detailed log info.

**/
Log.prototype.mostRecentEntry = function (index) {
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

