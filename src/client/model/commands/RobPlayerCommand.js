module.exports=RobPlayerCommand;

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
@class RobPlayerCommand
@constructor 
@param {int} playerIndex the index (NOT ID) of the player robbing
@param {int} victimIndex the index (NOT ID) of the player being robbed
@param {HexLocation} robberSpot the Location the robber is being placed
**/
function RobPlayerCommand(playerIndex, victimIndex, robberSpot){

	this.playerIndex = playerIndex;
	this.victimIndex = victimIndex;
	this.robberSpot = robberSpot;
}

RobPlayerCommand.prototype = new AbstractCommand();
RobPlayerCommand.prototype._name = 'RobPlayer';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
RobPlayerCommand.prototype.getData = function(){

	return {'type' : 'robPlayer',
			'playerIndex' : this.playerIndex,
			'victimIndex' : this.victimIndex,
			'location' : {'x' : this.robberSpot.getX(),
							'y' : this.robberSpot.getY()}
			};
};
