
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('discardCardsCommand', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      
      it('should give the bank the cards the player discarded', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , playerIndex = 0
          , currentHand = {brick:14, wood:13, sheep:15, wheat:10, ore:8}
          , discardedCards = {brick:10, wood:0, sheep:0, wheat:9, ore:6}
          , expectedHand = {brick:4, wood:13, sheep:15, wheat:1, ore:2}
          , initialBankResources = {brick:4, wood:9, sheep:1, wheat:7, ore:2}
          , expectedBankResources = {brick:14, wood:9, sheep:1, wheat:16, ore:8};

        game.turnTracker.setStatus('Discarding');
        game.players[playerIndex].setResources(currentHand);
        game.bank.setResources(initialBankResources);

        this.agent.post('/moves/discardCards')
          .send({'playerIndex':playerIndex, 'discardedCards':discardedCards})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }

            var game = app.gameRoom.getGameModel(1);
            expect(game.players[playerIndex].getResources()).to.deep.equal(expectedHand);
            expect(game.players[playerIndex].hasDiscarded()).to.be.true;
            expect(game.bank.getResources()).to.deep.equal(expectedBankResources);
            expect(game.turnTracker.getStatus()).to.equal('Discarding');

            done();
          });
      });
    });
  });
});
