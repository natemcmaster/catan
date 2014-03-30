var expect = require('chai').expect
  , request = require('supertest')
  , h = require('./helpers')
  ;

describe('Play Monopoly Command', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app
          , game = app.gameRoom.getGameModel(0);
          
          //Set all players ore to 1
          game.players.forEach(function(player){
            player.resources['ore'] = 1;
          });  


        this.agent.post('/moves/Monopoly')
          .send({resource:'ore',playerIndex:0})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.error(res.text);
              return done(err);
            }
            var game = app.gameRoom.getGameModel(0);
            
            for(var i = 0; i < game.players.length; i++){

              if(i == 0){
                expect(game.players[i].resources['ore']).to.eql(4);
              }
              else{
                expect(game.players[i].resources['ore']).to.eql(0);
              }

            }
            done();
          });
      });
    });
  });
});