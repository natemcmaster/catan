var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = DiscardCardsCommand


util.inherits(DiscardCardsCommand, AbstractMoveCommand);



function DiscardCardsCommand(gameID, playerIndex, brick, ore, sheep, wheat, wood){
	AbstractMoveCommand.call(this,gameID);
	this.playerIndex = playerIndex;
	this.brick = brick;
	this.ore = ore;
	this.sheep = sheep;
	this.wheat = wheat;
	this.wood = wood;


}

DiscardCardsCommand.prototype.executeOnGame = function(game){

	game.discardCards(this.playerIndex, this.brick, this.ore, this.sheep, this.wheat, this.wood);
}

