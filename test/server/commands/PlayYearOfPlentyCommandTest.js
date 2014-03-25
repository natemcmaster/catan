var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('Play Year Of Plenty Command', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
          var startBrick = game.players[0].resources['brick'];
          var startWood = game.players[0].resources['wood'];
        this.agent.post('/moves/Year_Of_Plenty')
          .send({resource1:'brick',resource2:'wood',playerIndex:0})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            
            expect(game.players[0].resources['brick']).to.eql(startBrick + 1);
            expect(game.players[0].resources['wood']).to.eql(startWood +1);
            done();
          });
      });
    });
  });
});