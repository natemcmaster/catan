module.exports=PlayRoadBuildingCommand;

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
@class PlayRoadBuildingCommand
@constructor 
@param {int} playerID the ID of the player playing the road building card
@param {list<EdgeLocation>} locations location to build the second road
**/
function PlayRoadBuildingCommand(playerID, location1,location2){

	this.playerID = playerID;
	this.locations = [location1,location2];
}

PlayRoadBuildingCommand.prototype = new AbstractCommand();
PlayRoadBuildingCommand.prototype.url = '/moves/Road_Building';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
PlayRoadBuildingCommand.prototype.getData = function(){

	return {'type':'Road_Building',
			'playerIndex': this.playerID,
			'spot1': {'x': this.locations[0].getHexLocation().getX(),
					  'y': this.locations[0].getHexLocation().getY(),
					  'direction': this.locations[0].getDirection()
					 },
			'spot2': {'x': this.locations[1].getHexLocation().getX(),
					  'y': this.locations[1].getHexLocation().getY(),
					  'direction': this.locations[1].getDirection()
					 }
			};
};
