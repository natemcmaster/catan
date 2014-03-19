var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

moduel.exports = RollDiceCommand


util.inherits(RollDiceCommand, AbstractMoveCommand);

function RollDiceCommand(gameID, playerIndex, number){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.number = number;

}

RollDiceCommand.prototype.executeOnGame = function(game){

	game.rollDice(this.playerIndex, this.number);

}