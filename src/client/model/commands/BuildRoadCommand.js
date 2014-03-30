module.exports = BuildRoadCommand;

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
@param {int} playerIndex the index (NOT ID) of the player wanting to build a road
@param {EdgeLocation} roadLocaiton location where the player wants to build the raod
@param {isFree} isFree wheter or not can be build at that location
**/
function BuildRoadCommand(playerIndex, roadLocation, isFree) {

	this.playerIndex = playerIndex;
	this.roadLocation = roadLocation;
	this.isFree = !! isFree;
}

BuildRoadCommand.prototype = new AbstractCommand();
BuildRoadCommand.prototype._name = 'BuildRoad';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
BuildRoadCommand.prototype.getData = function() {

	var dirs = ["NW", "N", "NE", "SE", "S", "SW"]
	return {
		'type': 'buildRoad',
		'playerIndex': this.playerIndex,
		'roadLocation': {
			'x': this.roadLocation.getHexLocation().getX(),
			'y': this.roadLocation.getHexLocation().getY(),
			'direction': dirs[this.roadLocation.getDirection()]
		},
		'free': this.isFree
	};
};
