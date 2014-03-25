var AbstractMoveCommand = require('./AbstractMoveCommand')
  , util = require('util')

module.exports = PlayMonumentCommand


util.inherits(PlayMonumentCommand, AbstractMoveCommand);

function PlayMonumentCommand(gameID, playerIndex){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;

}



PlayMonumentCommand.prototype.executeOnGame = function(game){

	game.playMonument(this.playerIndex);

}