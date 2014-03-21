var AbstractCommand = require('../AbstractCommand')
  , util = require('util')

module.exports = JoinGameCommand

util.inherits(JoinGameCommand, AbstractCommand);


function JoinGameCommand(playerID, color, gameID){

	this.playerID = playerID;
	this.color = color;
	this.gameID = gameID;
}


JoinGameCommand.prototype.execute = function(gameRoom){

	gameRoom.joinGame(this.playerID, this.color, this.gameID);

}