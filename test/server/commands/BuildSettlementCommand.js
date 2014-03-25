
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('buildSettlementCommand', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1);
        this.agent.post('/moves/buildSettlement')
          .send({
            "playerIndex": 0,
            "vertexLocation": {
                "x": -2,
                "y": 1,
                "direction": "W"
            },
            "free": true
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }

            expect(game.map.getSettlementOwner(-2, 1, 'W')).to.eql(0);
            expect(game.map.getSettlementOwner(-2, 1, 'SW')).to.eql(1);

            done();
          });
      });





    });
  });
});
