
var commands = require('../model/commands')

module.exports = {
  roll: roll,
  rolls: rolls
}

function roll(number, times, done) {
  var cm = game.clientModel
  cm.proxy.executeCommand(new commands.RollDiceCommand(cm.playerIndex, number), function () {
    // console.log('Rolled', number, times ? ('' + times + ' left') : '')
    if (times > 1) {
      return setTimeout(function () {
        roll(number, times - 1, done)
      }, 500)
    }
    console.log('Done rolling')
    done && done()
  })
}

function rolls() {
  var items = []
  for (var i=0; i<arguments.length - 1; i+=2) {
    items.push([].slice.call(arguments, i, i+2))
  }
  var loop = function () {
    if (!items.length) {
      console.log('Done rolling all')
      return
    }
    var item = items.shift()
    roll(item[0], item[1], loop)
  }
  loop()
}
