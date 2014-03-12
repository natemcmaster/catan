module.exports = BuildSettlementCommand;

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
@param {int} playerIndex the index (NOT ID) of the player wanting to build a settlement
@param {VertexLocation} settlementLocation location where the player wants to build the settlement
@param {isFree} isFree wheter or not can be build at that location
**/
function BuildSettlementCommand(playerIndex, settlementLocation, isFree){

	this.playerIndex = playerIndex;
	this.settlementLocation = settlementLocation;
	this.isFree = !!isFree;
}

BuildSettlementCommand.prototype = new AbstractCommand();
BuildSettlementCommand.prototype._name = 'BuildSettlement';

/**
<pre>
Pre-condition: NONE
Post-condition: NONE
</pre>
@method getData
@return {JSON} returns the JSON object formatted as the server will want it
**/
BuildSettlementCommand.prototype.getData = function(){

  var dirs = ["W","NW","NE","E","SE","SW"]
	return {
    'type':'buildSettlement',
    'playerIndex': this.playerIndex,
    'vertexLocation': {
      'x': this.settlementLocation.getHexLocation().getX(),
      'y': this.settlementLocation.getHexLocation().getY(),
      'direction': dirs[this.settlementLocation.getDirection()]
    },
    'free': this.isFree
  };
};
