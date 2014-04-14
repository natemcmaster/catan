var pref = '../../../src/server/model/commands/'
  , Abstract = require(pref + 'AbstractMoveCommand.js')
  , BuildRoadCommand = require(pref + 'moveCommands/BuildRoadCommand.js')
  , BuyDevCardCommand = require(pref + 'moveCommands/BuyDevCardCommand.js')
  , expect = require('chai').expect

describe('Command persistance', function () {
  it('should hibernate and resuccitate', function () {
    var brc = new BuildRoadCommand(10, 5, {x: 3, y: 10}, false)
    var js = brc.toJSON()
    var nrc = Abstract.fromJSON(js)
    expect(nrc instanceof BuildRoadCommand).to.be.true;
    expect(nrc.playerIndex).to.equal(5)
  })

  it('should persist a random cmd', function () {
    var brc = new BuyDevCardCommand(2, 13)
    var js = brc.toJSON()
    var nrc = Abstract.fromJSON(js)
    expect(nrc instanceof BuyDevCardCommand).to.be.true;
    expect(nrc.playerIndex).to.equal(13)
  })
})
