
var AbstractGameCommand = require('../AbstractGameCommand')
  , commands = require('./')
  , util = require('util')

module.exports = AbstractMoveCommand;
util.inherits(AbstractMoveCommand, AbstractGameCommand)

function AbstractMoveCommand(gameid) {
  AbstractGameCommand.call(this, gameid);
}

AbstractMoveCommand.prototype.replay = function (GameRoom) {
  this.execute(GameRoom);
}

AbstractGameCommand.prototype.toJSON = function () {
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

AbstractGameCommand.prototype.fromJSON = function (data) {
  for (var name in data) {
    this[name] = data[name]
  }
}

AbstractGameCommand.fromJSON = function (json) {
  var inst = Object.create(commands[json.type].prototype)
  inst.fromJSON(json.data)
}

