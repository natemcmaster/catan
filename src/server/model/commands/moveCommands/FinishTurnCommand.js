var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = FinishTurnCommand


util.inherits(FinishTurnCommand, AbstractMoveCommand);

function FinishTurnCommand(gameID, playerIndex){

	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;

}

FinishTurnCommand.prototype.executeOnGame = function(game){

	game.finishTurn(this.playerIndex);

}