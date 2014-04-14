var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('Discard Card Command', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
          
          var startOrePlayer = game.players[0].resources['brick'];
          var startSheepPlayer = game.players[0].resources['sheep'];
          var startWheatPlayer = game.players[0].resources['wheat'];
          var startWoodPlayer = game.players[0].resources['wood'];
          var startBrickPlayer = game.players[0].resources['brick'];



          game.bank.data['brick']=0;
          game.bank.data['sheep']=0;
          game.bank.data['wheat']=0;
          game.bank.data['wood']=0;
          game.bank.data['brick']=0;

        this.agent.post('/moves/discardCards')
          .send({playerIndex:0, discardedCards:{ore:1, sheep: 1, wheat:1, wood: 1, brick:1}})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            
            var endOrePlayer = game.players[0].resources['brick'];
            var endSheepPlayer = game.players[0].resources['sheep'];
            var endWheatPlayer = game.players[0].resources['wheat'];
            var endWoodPlayer = game.players[0].resources['wood'];
            var endBrickPlayer = game.players[0].resources['brick'];

            var endOreBank = game.bank.data['brick'];
            var endSheepBank = game.bank.data['sheep'];
            var endWheatBank = game.bank.data['wheat'];
            var endWoodBank = game.bank.data['wood'];
            var endBrickBank = game.bank.data['brick'];

            expect(endOrePlayer).to.eql(startOrePlayer - 1);
            expect(endSheepPlayer).to.eql(startSheepPlayer - 1);
            expect(endWheatPlayer).to.eql(startWheatPlayer -1);
            expect(endWoodPlayer).to.eql(startWoodPlayer -1);
            expect(endBrickPlayer).to.eql(startBrickPlayer - 1);

            expect(endOreBank).to.eql(1);
            expect(endSheepBank).to.eql(1);
            expect(endWheatBank).to.eql(1);
            expect(endWoodBank).to.eql(1);
            expect(endBrickBank).to.eql(1);


            done();
          });
      });
    });
  });
});