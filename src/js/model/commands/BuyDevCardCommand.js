module.exports=BuyDevCardCommand;
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
@class BuyDevCardCommand
@constructor 
@param {int} playerID the ID of the player wanting to buy a Development Card
**/
function BuyDevCardCommand(playerID){
	
	this.playerID = playerID;
}

BuyDevCardCommand.prototype = new AbstractCommand();
BuyDevCardCommand.prototype.url = '/moves/buyDevCard';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
BuyDevCardCommand.prototype.getData = function(){

	return {'type':'buyDevCard',
			'playerIndex': this.playerID};
};
