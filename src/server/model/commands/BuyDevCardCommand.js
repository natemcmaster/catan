var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

moduel.exports = BuyDevCardCommand


util.inherits(BuyDevCardCommand, AbstractMoveCommand);

function BuyDevCardCommand(gameID, playerIndex){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;

}

BuyDevCardCommand.prototype.executeOnGame = function(game){

	game.buyDevCard(this.playerIndex);

}