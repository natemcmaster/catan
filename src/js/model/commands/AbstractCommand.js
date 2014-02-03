/**
 * 
 * @module catan.model.commands
 * @namespace model
 */
module.exports=AbstractCommand;

function AbstractCommand(){
}

AbstractCommand.prototype.url = 'Forgot to Overide URL in sub-class';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getURL
@return {String} returns the URL of the command 
**/
AbstractCommand.prototype.getURL = function() {
	return this.url;
};