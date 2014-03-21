var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = BuildSettlementCommand


util.inherits(BuildSettlementCommand, AbstractMoveCommand);

function BuildSettlementCommand(gameID, playerIndex, settlementLocation, isFree){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.settlementLocation = settlementLocation;
	this.isFree = !!isFree;

}

BuildSettlementCommand.prototype.executeOnGame = function(game){

	game.buildSettlement(this.playerIndex, this.settlementLocation, this.isFree);

}