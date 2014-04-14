/**
 * 
 * @module catan.model.commands
 * @namespace model
 */
module.exports=AbstractCommand;

var URLS = require('./Urls');

function AbstractCommand(){
}

AbstractCommand.prototype._name = null;

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getURL
@return {String} returns the URL of the command 
**/
AbstractCommand.prototype.getURL = function() {
	return URLS[this._name];
};

