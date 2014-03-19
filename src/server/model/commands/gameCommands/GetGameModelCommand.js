var AbstractMoveCommand = require('../AbstractCommand')
  , util = require('util')

moduel.exports = GetGameModelCommand

util.inherits(GetGameModelCommand, AbstractCommand);


function GetGameModelCommand(gameID){

	this.gameID = gameID;
}


GetGameModelCommand.prototype.execute = function(gameRoom){

	gameRoom.getGameModel(gameID);
}