var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = SendChatCommand
util.inherits(SendChatCommand, AbstractMoveCommand);

function SendChatCommand(gameID, playerIndex, message){
	AbstractMoveCommand.call(this, gameID);	

	this.playerIndex = playerIndex;
	this.message = message;
}

SendChatCommand.params = ['playerIndex', 'content'];
SendChatCommand.optional = ['type'];

SendChatCommand.prototype.executeOnGame = function(game){
	game.sendChat(this.playerIndex, this.message);
}

