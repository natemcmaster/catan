
var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = ResetGameCommand

util.inherits(ResetGameCommand, AbstractMoveCommand);

function ResetGameCommand(gameID) {
	AbstractMoveCommand.call(this, gameID);	
}

ResetGameCommand.prototype.executeOnGame = function(game){
	game.reset()
}

