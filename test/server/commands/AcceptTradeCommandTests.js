var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('Accept Trade Command', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      
      it('should carry out the trade', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , offererIndex = 0
          , offererCurrentHand = {brick:14, wood:13, sheep:15, wheat:10, ore:8}
          , receiverIndex = 3
          , receiverCurrentHand = {brick:0, wood:1, sheep:1, wheat:0, ore:2}
          , offer = {brick:-2, wood:1, sheep:-1, wheat:0, ore:0}
          , tradeOffer = {'sender':offererIndex, 'receiver':receiverIndex, 'offer':offer}
          , willAccept = true
          , offererExpectedHand = {brick:12, wood:14, sheep:14, wheat:10, ore:8}
          , receiverExpectedHand = {brick:2, wood:0, sheep:2, wheat:0, ore:2};

        game.data.tradeOffer = tradeOffer;
        game.players[offererIndex].setResources(offererCurrentHand);
        game.players[receiverIndex].setResources(receiverCurrentHand);

        this.agent.post('/moves/acceptTrade')
          .send({'playerIndex':receiverIndex, 'willAccept':willAccept})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }

            var game = app.gameRoom.getGameModel(1);
            expect(game.players[offererIndex].getResources()).to.deep.equal(offererExpectedHand);
            expect(game.players[receiverIndex].getResources()).to.deep.equal(receiverExpectedHand);
            expect(game.data.tradeOffer).to.be.undefined;

            done();
          });
      });

      it('should reject the trade', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , offererIndex = 0
          , offererCurrentHand = {brick:14, wood:13, sheep:15, wheat:10, ore:8}
          , receiverIndex = 3
          , receiverCurrentHand = {brick:0, wood:1, sheep:1, wheat:0, ore:2}
          , offer = {brick:-2, wood:1, sheep:-1, wheat:0, ore:0}
          , tradeOffer = {'sender':offererIndex, 'receiver':receiverIndex, 'offer':offer}
          , willAccept = false

        game.data.tradeOffer = tradeOffer;
        game.players[offererIndex].setResources(offererCurrentHand);
        game.players[receiverIndex].setResources(receiverCurrentHand);

        this.agent.post('/moves/acceptTrade')
          .send({'playerIndex':receiverIndex, 'willAccept':willAccept})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }

            var game = app.gameRoom.getGameModel(1);
            expect(game.players[offererIndex].getResources()).to.deep.equal(offererCurrentHand);
            expect(game.players[receiverIndex].getResources()).to.deep.equal(receiverCurrentHand);
            expect(game.data.tradeOffer).to.be.undefined;

            done();
          });
      });
    });
  });
});
