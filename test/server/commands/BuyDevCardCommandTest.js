var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('Buy Dev Card Command', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
          

          var NumOfDevCardsStartDeck = game.deck.data['yearOfPlenty'] +
                                       game.deck.data['monopoly'] +
                                       game.deck.data['soldier'] +
                                       game.deck.data['roadBuilding'] +
                                       game.deck.data['monument'];

          var NumOfDevCardsStartPlayer = game.players[0].newDevCards['yearOfPlenty'] +
                                         game.players[0].newDevCards['monopoly'] +
                                         game.players[0].newDevCards['soldier'] +
                                         game.players[0].newDevCards['roadBuilding'] +
                                         game.players[0].newDevCards['monument']; 


        this.agent.post('/moves/buyDevCard')
          .send({playerIndex:0})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            
            var NumOfDevCardsEndDeck = game.deck.data['yearOfPlenty'] +
                                       game.deck.data['monopoly'] +
                                       game.deck.data['soldier'] +
                                       game.deck.data['roadBuilding'] +
                                       game.deck.data['monument'];


            var NumOfDevCardsEndPlayer = game.players[0].newDevCards['yearOfPlenty'] +
                                         game.players[0].newDevCards['monopoly'] +
                                         game.players[0].newDevCards['soldier'] +
                                         game.players[0].newDevCards['roadBuilding'] +
                                         game.players[0].newDevCards['monument']; 

 

            expect(NumOfDevCardsEndDeck).to.eql(NumOfDevCardsStartDeck -1);
            expect(NumOfDevCardsEndPlayer).to.eql(NumOfDevCardsStartPlayer +1);
            
            done();
          });
      });
    });
  });
});