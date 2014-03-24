
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , h = require('./helpers')
  ;

describe('sendChatCommand', function () {
  h.asSam(function () {
    h.inGame(0, function () {
      it('should work', function (done) {
        var app = this.app;
        this.agent.post('/moves/sendChat')
          .send({content:'hello',playerIndex:0,type:'sendChat'})
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log(res.text);
              return done(err);
            }
            expect(app.gameRoom.getGameModel(0).chat.data).to.eql({
              lines: [{source: 'Sam', message: 'hello'}]
            });
            done();
          });
      });
    });
  });
});

