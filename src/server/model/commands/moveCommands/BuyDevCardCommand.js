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
BuyDevCardCommand.logMessage = '{{name}} bought a dev card';

BuyDevCardCommand.prototype.executeOnGame = function(game){
	this.card = game.buyDevCard(this.playerIndex);
}

BuyDevCardCommand.prototype.replayOnGame = function(game){
	game.buyDevCard(this.playerIndex, this.card);
}

