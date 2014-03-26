var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('Finish Turn Command', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      
      it("should end the player's turn", function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , playerIndex = 0
          , currentOldDevCardHand = {yearOfPlenty:0, monopoly:0, soldier:2, roadBuilding:0, monument:1}
          , currentNewDevCardHand = {yearOfPlenty:0, monopoly:0, soldier:1, roadBuilding:1, monument:0}
          , expectedOldDevCardHand = {yearOfPlenty:0, monopoly:0, soldier:3, roadBuilding:1, monument:1}
          , expectedNewDevCardHand = {yearOfPlenty:0, monopoly:0, soldier:0, roadBuilding:0, monument:0}

        game.turnTracker.setStatus('Playing');
        game.players[playerIndex].oldDevCards = currentOldDevCardHand;
        game.players[playerIndex].newDevards = currentNewDevCardHand;
        game.players[playerIndex].discarded = true;
        game.players[playerIndex].playedDevCard = true;

        this.agent.post('/moves/finishTurn')
          .send({'playerIndex':playerIndex})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }

            var game = app.gameRoom.getGameModel(1);
            expect(game.players[playerIndex].oldDevCards).to.deep.equal(expectedOldDevCardHand);
            expect(game.players[playerIndex].newDevCards).to.deep.equal(expectedNewDevCardHand);
            expect(game.players[playerIndex].playedDevCard).to.be.false;
            expect(game.players[playerIndex].hasDiscarded()).to.be.false;
            expect(game.turnTracker.getStatus()).to.equal('Rolling');

            done();
          });
      });
    });
  });
});
