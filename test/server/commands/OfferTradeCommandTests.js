var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('Offer Trade Command', function () {
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      
      it('should add the trade offer to the game model', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(1)
          , offererIndex = 0
          , offer = {brick:-2, wood:1, sheep:-1, wheat:0, ore:0}
          , receiverIndex = 3
          , tradeOffer = {'playerIndex':offererIndex, 'offer':offer, 'receiver':receiverIndex}
          , modelOffer = {'sender':offererIndex, 'receiver':receiverIndex, 'offer':offer}
        expect()
        this.agent.post('/moves/offerTrade')
          .send(tradeOffer)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }

            var game = app.gameRoom.getGameModel(1);
            expect(game.data.tradeOffer).to.deep.equal(modelOffer);
            expect(game.toJSON().tradeOffer).to.deep.equal(modelOffer);

            done();
          });
      });
    });
  });
});
