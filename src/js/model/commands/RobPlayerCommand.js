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
@param {int} playerID he ID of the player robbing
@param {int} victimID the ID of the player being robbed
@param {HexLocation} robberSpot the Location the robber is being placed
**/
function RobPlayerCommand(playerID, victimID, robberSpot){

	this.playerID = playerID;
	this.victimID = victimID;
	this.robberSpot = robberSpot;
}

RobPlayerCommand.prototype = new AbstractCommand();
RobPlayerCommand.prototype.url = '/moves/RobPlayer';

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
			'playerIndex' : this.playerID,
			'victimIndex' : this.victimID,
			'robberSpot' : {'x' : this.robberSpot.getX(),
							'y' : this.robberSpot.getY()}
			};
};
