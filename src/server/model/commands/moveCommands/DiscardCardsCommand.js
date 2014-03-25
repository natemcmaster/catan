var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = DiscardCardsCommand


util.inherits(DiscardCardsCommand, AbstractMoveCommand);



function DiscardCardsCommand(gameID, playerIndex, cardsToDiscard){
	AbstractMoveCommand.call(this,gameID);
	this.playerIndex = playerIndex;
	this.cardsToDiscard = cardsToDiscard;

}
DiscardCardsCommand.params = ['playerIndex', 'discardedCards'];
DiscardCardsCommand.optional = ['type'];

DiscardCardsCommand.prototype.executeOnGame = function(game){

	game.discardCards(this.playerIndex, this.cardsToDiscard);
}

