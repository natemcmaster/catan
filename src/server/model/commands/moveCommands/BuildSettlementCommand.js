var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = BuildSettlementCommand


util.inherits(BuildSettlementCommand, AbstractMoveCommand);

function BuildSettlementCommand(gameID, playerIndex, settlementLocation, free){
	AbstractMoveCommand.call(this,gameID);

	this.playerIndex = playerIndex;
	this.settlementLocation = settlementLocation;
	this.free = !!free;

}
BuildSettlementCommand.params = ['playerIndex', 'vertexLocation', 'free'];
BuildSettlementCommand.optional = ['type'];
BuildSettlementCommand.logMessage = '{{name}} built a settlement';

BuildSettlementCommand.prototype.executeOnGame = function(game){

	game.buildSettlement(this.playerIndex, this.settlementLocation, this.free);

}
