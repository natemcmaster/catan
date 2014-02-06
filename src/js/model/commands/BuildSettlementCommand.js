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
@class BuildSettlementCommand
@constructor 
@param {int} playerID the ID of the player wanting to build a settlement
@param {HexLocation} settlementLocation location where the player wants to build the settlement
@param {isFree} isFree wheter or not can be build at that location
**/
function BuildSettlementCommand(playerID, settlementLocation, isFree){

	this.playerID = playerID;
	this.settlementLoaction = settlementLocation;
	this.isFree = isFree;
}

BuildSettlementCommand.prototype = new AbstractCommand();
BuildSettlementCommand.AbstractCommand.url = '/moves/buildSettlement';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
BuildSettlementCommand.prototype.getData = function(){

	return {'type':'buildSettlement',
			'playerIndex': this.playerID,
			'vertexLocation': {'x': this.settlementLoaction.getX(),
							   'y': this.settlementLoaction.getY(),
							   'direction': this.settlementLoaction.getDirection()},
			'free': this.isFree};
};