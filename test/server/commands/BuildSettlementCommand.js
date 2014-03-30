
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('buildSettlementCommand', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      it('should place settlement on right location', function (done) {
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

      it('should make bank receive payment for settlement', function (done) {
        var app = this.app
            , game = app.gameRoom.getGameModel(1)
            , sam = game.players[0];
        expect(sam.resources['brick']).to.equal(14);
        expect(sam.resources['wood']).to.equal(13);
        expect(sam.resources['sheep']).to.equal(15);
        expect(sam.resources['wheat']).to.equal(10);

        this.agent.post('/moves/buildSettlement')
          .send({
            "playerIndex": 0,
            "vertexLocation": {
                "x": -2,
                "y": 1,
                "direction": "E"
            },
            "free": false
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }

            expect(sam.resources['brick']).to.equal(13);
            expect(sam.resources['wood']).to.equal(12);
            expect(sam.resources['sheep']).to.equal(14);
            expect(sam.resources['wheat']).to.equal(9);

            done();
          });
      });

      it('should set a winning player', function (done) {
        var app = this.app
            , game = app.gameRoom.getGameModel(1)
            , sam = game.players[0];

            // Artificially set Sam's points to 9, then build a settlement
            sam.victoryPoints = 9;

            expect(game.data.winner).to.equal(-1);

        this.agent.post('/moves/buildSettlement')
          .send({
            "playerIndex": 0,
            "vertexLocation": {
                "x": 0,
                "y": -2,
                "direction": "E"
            },
            "free": false
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }

            // Now that Sam has built a settlment and he had 9 points, this should make him the winner
            expect(game.data.winner).to.equal(0);

            done();
          });
      });









    });
  });
});
