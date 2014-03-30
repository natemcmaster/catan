module.exports = AcceptTradeCommand;
/**
 * 
 * @module catan.model.commands
 * @namespace model
 */

var AbstractCommand = require('./AbstractCommand');

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@class AcceptTradeCommand
@constructor 
@param {int} playerIndex the index (NOT ID) of the player accepting the trade
@param {bool} willAccept will the player accept the trade
**/
function AcceptTradeCommand(playerIndex, willAccept){

	this.playerIndex = playerIndex;
	this.willAccept = willAccept;
}

AcceptTradeCommand.prototype = new AbstractCommand();
AcceptTradeCommand.prototype._name = 'AcceptTrade';

/**
 * <pre>
 * Pre-condition: NONE
 * Post-condition: NONE
 * </pre>
 * @method getData
 * @return {JSON} returns the JSON object formatted as the server will want it
 */
AcceptTradeCommand.prototype.getData = function(){
	return {
		'type':'acceptTrade',
		'playerIndex' : this.playerIndex,
		'willAccept' : this.willAccept
	};
};

