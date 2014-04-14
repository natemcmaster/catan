
module.exports = AbstractMoveCommand

var AbstractGameCommand = require('./AbstractGameCommand')
  , util = require('util')

util.inherits(AbstractMoveCommand, AbstractGameCommand)

function AbstractMoveCommand(gameid) {
  AbstractGameCommand.call(this, gameid);
}

AbstractMoveCommand.prototype.replayOnGame = function (game) {
  this.executeOnGame(game);
}

AbstractMoveCommand.prototype.toJSON = function () {
  var json = {
    type: this.constructor.name,
    data: {}
  }
  for (var name in this) {
    if (this.hasOwnProperty(name)) {
      json.data[name] = this[name]
    }
  }
  return json
}

AbstractMoveCommand.prototype.fromJSON = function (data) {
  for (var name in data) {
    this[name] = data[name]
  }
}

AbstractMoveCommand.fromJSON = function (json) {
  var commands = require('./moveCommands')
  var inst = Object.create(commands[json.type].prototype)
  inst.fromJSON(json.data)
  return inst
}

