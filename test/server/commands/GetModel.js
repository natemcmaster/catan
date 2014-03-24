var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe.only('buildRoadCommand', function () {
  h.asSam(function () {
    h.inGame(1, function () {
      var model;
      beforeEach(function (done) {
        this.agent.get('/game/model')
          .end(function (err, res) {
            if (err) {
              console.error('HTTP Error', res.text);
              return done(err);
            }
            model = res.body;
            
            done();
          });
      });

      it('should contain 4 players', function () {
        expect(model.players.length).to.equal(4);
      });

      it('should have players with resources', function () {
        expect(model.players[0].resources).to.eql({
          "brick": 14,
          "wood": 13,
          "sheep": 15,
          "wheat": 10,
          "ore": 8
        });
      });
    });
  });
});

