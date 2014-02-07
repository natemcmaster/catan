module.exports=BuildCityCommand;

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
@class BuildCityCommand
@constructor 
@param {int} playerID the ID of the player wanting to build a City
@param {HexLocation} cityLocation location where the player wants to build the city
@param {isFree} isFree wheter or not can be build at that location
**/
function BuildCityCommand(playerID, cityLocation, isFree){

	this.playerID = playerID;
	this.cityLoaction = cityLocation;
	this.isFree = isFree;
}

BuildCityCommand.prototype = new AbstractCommand();
BuildCityCommand.prototype.url = '/moves/buildCity';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
BuildCityCommand.prototype.getData = function(){

	return {'type':'buildCity',
			'playerIndex': this.playerID,
			'vertexLocation': {'x': this.cityLoaction.getX(),
							   'y': this.cityLoaction.getY(),
							   'direction': this.cityLoaction.getDirection()},
			'free': this.isFree};
};