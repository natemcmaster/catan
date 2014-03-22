
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe.only('buildRoadCommand', function () {
  h.asSam(function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
        this.agent.post('/moves/buildRoad')
          .send({roadLocation:{x:0, y:0, direction: 'N'},free:true,playerIndex:0})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            expect(game.map.getRoadOwner(0, 0, 'N')).to.eql(0);
            expect(game.map.getRoadOwner(0, -1, 'S')).to.eql(0);
            done();
          });
      });
    });
  });
});

