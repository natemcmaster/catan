
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('buildCityCommand', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      it('should place city on right location', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , sam = game.players[0];
        expect(sam.resources['wheat']).to.equal(10);
        expect(sam.resources['ore']).to.equal(8);
        this.agent.post('/moves/buildCity')
          .send({
            playerIndex: 0,
            vertexLocation: {
              x: 0,
              y: 2,
              direction: 'NE'
            },
            free: false
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log('HTTP ERROR', res.text);
              return done(err)
            }
            expect(sam.resources['wheat']).to.equal(8);
            expect(sam.resources['ore']).to.equal(5);
            expect(game.map.hex.getVertex(0, 1, 'SE').value.worth).to.equal(2)
            done()
          })
      });
    });
  });
});


