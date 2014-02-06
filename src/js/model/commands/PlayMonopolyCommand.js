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
@class PlayMonopoplyCommand
@constructor 
@param {int} playerID the ID of the player playing the card
@param {int} resource the enumeration of the resource to be monopolized
**/
function PlayMonopolyCommand(playerID, resource){

	this.playerID = playerID;
	this.resource = resource;	
}

PlayMonopolyCommand.prototype = new AbstractCommand();
PlayMonopolyCommand.AbstractCommand.url = '/moves/Monopoly';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
PlayMonopolyCommand.prototype.getData = function(){

	return {'type' : 'Monopoly',
						'resource' : this.resource,
						'playerIndex' : this.playerID};
};
