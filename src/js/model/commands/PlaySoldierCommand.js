module.exports=PlaySoldierCommand;

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
@class PlaySoldierCommand
@constructor 
@param {int} playerIndex the index (NOT ID) of the player playing the Soldier Card
@param {int} victimIndex The index (NOT ID) of the player being robbed from
@param {HexLocation} robberSpot The spot the robber is being placed
**/
function PlaySoldierCommand(playerIndex, victimIndex, robberSpot){

	this.playerIndex = playerIndex;
	this.victimIndex = victimIndex;
	this.robberSpot = robberSpot;
}

PlaySoldierCommand.prototype = new AbstractCommand();
PlaySoldierCommand.prototype.url = '/moves/Soldier';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
PlaySoldierCommand.prototype.getData = function(){

	return {'type' : 'Soldier',
			'playerIndex' : this.playerIndex,
			'victimIndex' : this.victimIndex,
			'location' : {'x' : this.robberSpot.getX(),
							'y' : this.robberSpot.getY()}
			};	
};
