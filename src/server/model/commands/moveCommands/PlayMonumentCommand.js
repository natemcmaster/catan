var AbstractMoveCommand = require('../AbstractMoveCommand')
  , util = require('util')

module.exports = PlayMonumentCommand


util.inherits(PlayMonumentCommand, AbstractMoveCommand);

function PlayMonumentCommand(gameID, playerIndex){
	AbstractMoveCommand.call(this,gameID);	

	this.playerIndex = playerIndex;

}

PlayMonumentCommand.params = ['playerIndex'];
PlayMonumentCommand.optional = ['type'];
PlayMonumentCommand.logMessage = '{{name}} played a monument card';

PlayMonumentCommand.prototype.executeOnGame = function(game){

	game.playMonument(this.playerIndex);

}
