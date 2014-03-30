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
@param {int} playerIndex the index (NOT ID) of the player playing the road building card
@param {EdgeLocation} location1 location to build the first road
@param {EdgeLocation} location2 location to build second road
**/
function PlayRoadBuildingCommand(playerIndex, location1,location2){

	this.playerIndex = playerIndex;
	this.locations = [location1,location2];
}

PlayRoadBuildingCommand.prototype = new AbstractCommand();
PlayRoadBuildingCommand.prototype._name = 'PlayRoadBuilding';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
PlayRoadBuildingCommand.prototype.getData = function(){

  var dirs = ["NW","N","NE","SE","S","SW"]
	return {'type':'Road_Building',
			'playerIndex': this.playerIndex,
			'spot1': {'x': this.locations[0].getHexLocation().getX(),
					  'y': this.locations[0].getHexLocation().getY(),
					  'direction': dirs[this.locations[0].getDirection()]
					 },
			'spot2': {'x': this.locations[1].getHexLocation().getX(),
					  'y': this.locations[1].getHexLocation().getY(),
					  'direction': dirs[this.locations[1].getDirection()]
					 }
			};
};
