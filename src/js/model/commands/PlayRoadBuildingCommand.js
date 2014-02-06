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
@param {HexLocation} location1 location to build the first road
@param {HexLocation} location2 location to build the second road
**/
function PlayRoadBuildingCommand(playerID, location_1, location_2){

	this.playerID = playerID;
	this.location_1 = location_1;
	this.location_2 = location_2;	
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
			'spot1': {'x': this.location_1.getX(),
					  'y': this.location_1.getY(),
					  'direction': this.location_1.getDirection()
					 },
			'spot2': {'x': this.location_2.getX(),
					  'y': this.location_2.getY(),
					  'direction': this.location_2.getDirection()
					 }
			};
};
