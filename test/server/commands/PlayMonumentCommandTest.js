var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('Play Monumnet Command', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
          
          var startMonuments = game.players[0].monuments;
          var startVictoryPoints = game.players[0].victoryPoints;

        this.agent.post('/moves/Monument')
          .send({playerIndex:0})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            
            expect(game.players[0].monuments).to.eql(startMonuments +1);
            expect(game.players[0].victoryPoints).to.eql(startVictoryPoints +1);
            
            done();
          });
      });
    });
  });
});