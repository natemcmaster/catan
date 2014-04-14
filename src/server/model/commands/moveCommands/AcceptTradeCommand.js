var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util');

module.exports = AcceptTradeCommand;
console.log(AbstractMoveCommand, AcceptTradeCommand)
util.inherits(AcceptTradeCommand, AbstractMoveCommand);

function AcceptTradeCommand(gameID, playerIndex, willAccept){
	AbstractMoveCommand.call(this,gameID);

	this.playerIndex = playerIndex;
	this.willAccept = willAccept;
	this.logMessage = (willAccept) ? '{{name}} accepted the trade' : '{{name}} rejected the trade';
}

AcceptTradeCommand.params = ['playerIndex', 'willAccept'];
AcceptTradeCommand.optional = ['type'];

AcceptTradeCommand.prototype.executeOnGame = function(game){
	game.acceptTrade(this.playerIndex, this.willAccept);
}

