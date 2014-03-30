var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('Roll 7 Test -- Discarding', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
          
          game.players[0].resources['brick'] = 8;

        this.agent.post('/moves/rollNumber')
          .send({playerIndex:0, number:7})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            
            expect(game.turnTracker.data.status).to.eql('Discarding');
            done();
          });
      });
    });
  });
});

describe('Roll 7 Test --  Robbing', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
          

        this.agent.post('/moves/rollNumber')
          .send({playerIndex:0, number:7})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            
            expect(game.turnTracker.data.status).to.eql('Robbing');
            done();
          });
      });
    });
  });
});