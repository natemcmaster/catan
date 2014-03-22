
var AbstractCommand = require('./AbstractCommand')
  , util = require('util')

module.exports = AbstractGameCommand;
util.inherits(AbstractGameCommand, AbstractCommand)

function AbstractGameCommand(gameid) {
  this._gameid = gameid;
}

AbstractGameCommand.prototype.execute = function (gameRoom) {
  var game = gameRoom.getGameModel(this._gameid);
  if (!game) return new Error('Game not found: ' + this._gameid);
  this.executeOnGame(game);
}

AbstractGameCommand.prototype.executeOnGame = function (game) {
  throw new Error('This must be overridden');
}

AbstractGameCommand.prototype.response = function (room) {
  return room.getGameModel(this._gameid).toJSON()
}

