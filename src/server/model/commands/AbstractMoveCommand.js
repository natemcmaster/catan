
var AbstractCommand = require('./AbstractCommand')
  , util = require('util')

module.exports = AbstractMoveCommand;
util.inherits(AbstractMoveCommand, AbstractCommand)

function AbstractMoveCommand(gameid) {
  this._gameid = gameid;
}

AbstractCommand.prototype.execute = function (gameRoom) {
  this.executeOnGame(gameRoom.getGame(this._gameid));
}

AbstractCommand.prototype.executeOnGame = function (game) {
  throw new Error('This must be overridden');
}


