
var AbstractCommand = require('../AbstractCommand')
  , util = require('util')

module.exports = AbstractMoveCommand;
util.inherits(AbstractMoveCommand, AbstractCommand)

function AbstractMoveCommand(gameid) {
  this._gameid = gameid;
}

AbstractCommand.prototype.execute = function (gameRoom) {
  this.executeOnGame(gameRoom.getGameByID(this._gameid));
}

AbstractCommand.prototype.executeOnGame = function (game) {
  throw new Error('This must be overridden');
}

AbstractCommand.prototype.response = function (room) {
  return room.getGameByID(this._gameid).toJSON()
}

