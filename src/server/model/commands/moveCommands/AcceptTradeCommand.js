var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = AcceptTradeCommand


util.inherits(AcceptTradeCommand, AbstractMoveCommand);

function AcceptTradeCommand(gameID, playerIndex, willAccept){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.willAccept = willAccept;
}
AcceptTradeCommand.params = ['playerIndex', 'willAccept'];
AcceptTradeCommand.optional = ['type'];

AcceptTradeCommand.prototype.executeOnGame = function(game){

	game.acceptTrade(this.playerIndex, this.willAccept)
}
