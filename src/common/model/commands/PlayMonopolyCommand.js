module.exports = PlayMonopolyCommand;

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
@class PlayMonopolyCommand
@constructor 
@param {int} playerIndex the index (NOT ID) of the player playing the card
@param {int} resource the enumeration of the resource to be monopolized
**/
function PlayMonopolyCommand(playerIndex, resource){

	this.playerIndex = playerIndex;
	this.resource = resource;	
}

PlayMonopolyCommand.prototype = new AbstractCommand();
PlayMonopolyCommand.prototype._name = 'PlayMonopoly',

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
						'playerIndex' : this.playerIndex};
};
