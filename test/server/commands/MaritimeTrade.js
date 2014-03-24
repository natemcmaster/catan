
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('maritimeTrade', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      it('should trade 4:1', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , sam = game.players[0];
        expect(sam.resources['brick']).to.equal(14);
        expect(sam.resources['wood']).to.equal(13);

        this.agent.post('/moves/maritimeTrade')
          .send({
            playerIndex: 0,
            ratio: 4,
            inputResource: 'wood',
            outputResource: 'brick'
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(1)
              , sam = game.players[0];
            expect(sam.resources['brick']).to.equal(15);
            expect(sam.resources['wood']).to.equal(9);
            done();
          });
      });

      it('should trade 3:1', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , sam = game.players[0];
        expect(sam.resources['brick']).to.equal(14);
        expect(sam.resources['wood']).to.equal(13);

        this.agent.post('/moves/maritimeTrade')
          .send({
            playerIndex: 0,
            ratio: 3,
            inputResource: 'wood',
            outputResource: 'brick'
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(1)
              , sam = game.players[0];
            expect(sam.resources['brick']).to.equal(15);
            expect(sam.resources['wood']).to.equal(10);
            done();
          });
      });

      it('should trade 2:1', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , sam = game.players[0];
        expect(sam.resources['wheat']).to.equal(10);
        expect(sam.resources['sheep']).to.equal(15);

        this.agent.post('/moves/maritimeTrade')
          .send({
            playerIndex: 0,
            ratio: 2,
            inputResource: 'wheat',
            outputResource: 'sheep'
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(1)
              , sam = game.players[0];
            expect(sam.resources['wheat']).to.equal(8);
            expect(sam.resources['sheep']).to.equal(16);
            done();
          });
      });
    });
  });
});

