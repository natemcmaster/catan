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
@class BuildRoadCommand
@constructor 
@param {int} playerID the ID of the player wanting to build a road
@param {HexLocation} roadLocaiton location where the player wants to build the raod
@param {isFree} isFree wheter or not can be build at that location
**/
function BuildRoadCommand(playerID, roadLocation, isFree){

	this.playerID = playerID;
	this.roadLoaction = roadLocation;
	this.isFree = isFree;
}

BuildRoadCommand.prototype = new AbstractCommand();
BuildRoadCommand.prototype.url = '/moves/buildRoad';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
BuildRoadCommand.prototype.getData = function(){

	return {'type':'buildRoad',
			'playerIndex': this.playerID,
			'vertexLocation': {'x': this.roadLoaction.getX(),
							   'y': this.roadLoaction.getY(),
							   'direction': this.roadLoaction.getDirection()},
			'free':this.isFree};
};
