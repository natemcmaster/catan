
var AbstractGameCommand = require('../AbstractGameCommand')
  , util = require('util')

module.exports = AbstractMoveCommand;
util.inherits(AbstractMoveCommand, AbstractGameCommand)

function AbstractMoveCommand(gameid) {
  AbstractGameCommand.call(this, gameid);
}
