var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = DiscardCardsCommand
util.inherits(DiscardCardsCommand, AbstractMoveCommand);

function DiscardCardsCommand(gameID, playerIndex, discardedCards){
	AbstractMoveCommand.call(this,gameID);
	
	this.playerIndex = playerIndex;
	this.discardedCards = discardedCards;
}

DiscardCardsCommand.params = ['playerIndex', 'discardedCards'];
DiscardCardsCommand.optional = ['type'];
DiscardCardsCommand.logMessage = '{{name}} discarded cards';

DiscardCardsCommand.prototype.executeOnGame = function(game){
	game.discardCards(this.playerIndex, this.discardedCards);
}

