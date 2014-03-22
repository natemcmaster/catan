var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = MartimeTradeCommand


util.inherits(MartimeTradeCommand, AbstractMoveCommand);

function MartimeTradeCommand(gameID, playerIndex, ratio, inputResource, outputResource){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;
	this.ratio = ratio;
	this.inputResource = inputResource;
	this.outputResource = outputResource;

}

MartimeTradeCommand.prototype.executeOnGame = function(game){

	game.martimeTrade(this.playerIndex, this.ratio, this.inputResource, this.outputResource);

}