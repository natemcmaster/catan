var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('Play Road Building Command', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
        this.agent.post('/moves/Road_Building')
          .send({spot1:{x:-2, y:2, direction: 'N'},spot2:{x:2, y:0, direction: 'N'},playerIndex:0})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            //spot 1
            expect(game.map.getRoadOwner(0, 0, 'N')).to.eql(0);
            expect(game.map.getRoadOwner(0, -1, 'S')).to.eql(0);
            //spot 2
            expect(game.map.getRoadOwner(0, 1, 'N')).to.eql(0);
            done();
          });
      });
    });
  });
});