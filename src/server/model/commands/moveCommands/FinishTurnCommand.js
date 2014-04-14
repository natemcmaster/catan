var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = FinishTurnCommand


util.inherits(FinishTurnCommand, AbstractMoveCommand);

function FinishTurnCommand(gameID, playerIndex){

	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;

}

FinishTurnCommand.params = ['playerIndex']
FinishTurnCommand.optional = ['type']
FinishTurnCommand.logMessage = '{{name}}\'s turn finished'

FinishTurnCommand.prototype.executeOnGame = function(game){
	game.finishTurn(this.playerIndex);
}
