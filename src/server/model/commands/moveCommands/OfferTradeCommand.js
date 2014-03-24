var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = OfferTradeCommand


util.inherits(OfferTradeCommand, AbstractMoveCommand);

function OfferTradeCommand(gameID, playerIndex, receiverIndex, brick, ore, sheep, wheat, wood){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.receiverIndex = receiverIndex;
	this.brick = brick;
	this.ore = ore;
	this.sheep = sheep;
	this.wheat = wheat;
	this.wood = wood;

}

OfferTradeCommand.prototype.executeOnGame = function(game){

	game.offerTrade(this.playerIndex, this.receiverIndex, this.brick, 
						this.ore, this.sheep, this.wheat, this.wood);

}