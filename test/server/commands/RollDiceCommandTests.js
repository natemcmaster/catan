
var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('rollDiceCommand', function () {
  h.asSam(function () {
    h.inGame(1, function () {
      beforeEach(function () {
        var app = this.app
          , game = app.gameRoom.getGameModel(1);
        expect(game.turnTracker.getStatus()).to.eql('Rolling');
      });
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1);
        this.agent.post('/moves/rollNumber')
          .send({number:3,playerIndex:0,type:'rollNumber'})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error('HTTP Error:', res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(1);
            expect(game.turnTracker.getCurrentPlayerIndex()).to.eql(0);
            expect(game.turnTracker.getStatus()).to.eql('Playing');
            done();
          });
      });
    });
  });
});

