var AbstractMoveCommand = require('../AbstractCommand')
  , util = require('util')

moduel.exports = ListGamesCommand

util.inherits(ListGamesCommand, AbstractCommand);


function ListGamesCommand(){


}


ListGamesCommand.prototype.execute = function(gameRoom){

	gameRoom.listGames();
}