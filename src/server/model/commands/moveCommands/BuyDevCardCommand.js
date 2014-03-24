var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = BuyDevCardCommand


util.inherits(BuyDevCardCommand, AbstractMoveCommand);

function BuyDevCardCommand(gameID, playerIndex){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;

}
BuyDevCardCommand.params = ['playerIndex'];
BuyDevCardCommand.optional = ['type'];

BuyDevCardCommand.prototype.executeOnGame = function(game){

	game.buyDevCard(this.playerIndex);

}
