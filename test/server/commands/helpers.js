
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , TestLogger = require('../../../src/server/').resources.FileLogger
  ;

module.exports = {
  asSam: loggedInAs.bind(null, 'Sam', 'sam'),
  loggedInAs: loggedInAs,
  inGame: inGame
}

function loggedInAs(name, password, sub) {
  describe('logged in as ' + name, function () {
    beforeEach(function (done) {
      if (!this.app) this.app = MakeApp(TestLogger);
      this.agent = request.agent(this.app);
      this.agent.post('/user/login')
        .send({username: 'Sam', password: 'sam'})
        .expect(200, done)
    });
    sub();
  });
}

function inGame(gameid, sub) {
  describe('in game ' + gameid, function () {
    beforeEach(function (done) {
      this.agent.post('/games/join')
        .send({id: 0})
        .send({color: 'orange'})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            console.log(res.text);
          }
          this.agent.saveCookies(res);
          done(err);
        }.bind(this));
    });
    sub();
  });
}

