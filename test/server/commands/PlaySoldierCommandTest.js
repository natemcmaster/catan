var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('Play Soldier Command', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      it('should move the soldier', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1);

        var sam = game.players[0];
        var brooke = game.players[1];

        expect(game.map.data.robber.x).to.equal(1);
        expect(game.map.data.robber.y).to.equal(-1);
        expect(sam.oldDevCards.soldier).to.equal(2);
        expect(sam.soldiers).to.equal(1);

        sam.playedDevCard = false;
        expect(sam.playedDevCard).to.equal(false);

        var robbingPlayerResources = sam.getNumResources();
        var robbedPlayerResources = brooke.getNumResources();

        this.agent.post('/moves/Soldier')
          .send({
                 'playerIndex' : 0,
                 'victimIndex' : 1,
                 'location' : {
                        'x' : -2,
                        'y' : 2
                  }
          })
          .expect(200)
          .end(function (err, res) {

            if (err) {
              console.error(res.text);
              return done(err);
            }

            expect(game.map.data.robber.x).to.equal(-2);
            expect(game.map.data.robber.y).to.equal(2);
            expect(sam.oldDevCards.soldier).to.equal(1);
            expect(sam.soldiers).to.equal(2);
            expect(sam.playedDevCard).to.equal(true);
            expect(sam.getNumResources()).to.equal(robbingPlayerResources + 1);
            expect(sam.hasLargestArmy()).to.be.false;
            expect(brooke.getNumResources()).to.equal(robbedPlayerResources - 1);

            done();
          });
      });

      it('should give sam the largest army', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1);

        var sam = game.players[0];
        var brooke = game.players[1];
        sam.soldiers = 2;
        sam.playedDevCard = false;

        expect(game.map.data.robber.x).to.equal(1);
        expect(game.map.data.robber.y).to.equal(-1);
        expect(sam.oldDevCards.soldier).to.equal(2);
        expect(sam.soldiers).to.equal(2);
        expect(sam.playedDevCard).to.be.false;
        expect(sam.largestArmy).to.be.false;

        var robbingPlayerResources = sam.getNumResources();
        var robbedPlayerResources = brooke.getNumResources();

        this.agent.post('/moves/Soldier')
          .send({
                 'playerIndex' : 0,
                 'victimIndex' : 1,
                 'robberSpot' : {
                        'x' : -2,
                        'y' : 2
                  }
          })
          .expect(200)
          .end(function (err, res) {

            if (err) {
              console.error(res.text);
              return done(err);
            }

            expect(game.map.data.robber.x).to.equal(-2);
            expect(game.map.data.robber.y).to.equal(2);
            expect(sam.oldDevCards.soldier).to.equal(1);
            expect(sam.soldiers).to.equal(3);
            expect(sam.playedDevCard).to.be.true;
            expect(sam.getNumResources()).to.equal(robbingPlayerResources + 1);
            expect(brooke.getNumResources()).to.equal(robbedPlayerResources - 1);
            expect(sam.hasLargestArmy()).to.be.true;

            done();
          });
      });

    });
  });
});
