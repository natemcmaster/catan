var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util');

module.exports = OfferTradeCommand;
util.inherits(OfferTradeCommand, AbstractMoveCommand);

function OfferTradeCommand(gameID, playerIndex, offer, receiver) {
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.offer = offer;
	this.receiver = receiver;
}

OfferTradeCommand.params = ['playerIndex', 'offer', 'receiver'];
OfferTradeCommand.optional = ['type'];
OfferTradeCommand.logMessage = '{{name}} offered a trade to {{receiver}}';

OfferTradeCommand.prototype.executeOnGame = function(game) {
	game.offerTrade(this.playerIndex, this.offer, this.receiver);
}
