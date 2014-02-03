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
@class DiscardCardsCommand
@constructor 
@param {int} the ID of the player discarding cards
@param {int} number of brick to be discarded
@param {int} number of ore to be discarded
@param {int} number of sheep to be discarded
@param {int} number of wheat to be discarded
@param {int} number of wood to be discarded
**/
function DiscardCardsCommand(playerID, brick, ore, sheep, wheat, wood){

	this.playerID = playerID;
	this.brick = brick;
	this.ore = ore;
	this.sheep = sheep;
	this.wheat = wheat;
	this.wood = wood;
	
	

	DiscardCardsCommand.AbstractCommand.url = '/moves/discardCards';
}

DiscardCardsCommand.prototype = new AbstractCommand();
/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
DiscardCardsCommand.prototype.getData = function(){

	return {'type': 'discardCards',
			'playerIndex': this.playerID,
			'discardedCards':{ 
				'brick': this.brick,
				'ore': this.ore,
				'sheep': this.sheep,
				'wheat': this.wheat,
				'wood': this.wood,
				}

			};
	
};