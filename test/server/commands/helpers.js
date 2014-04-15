
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../../src/server/catan')
  , testConfig = require('../../test-config')
  , SqlitePL = require('../../../src/server/persistance/sqlite.js')
  // , FilePL = require('../../../src/server/persistance/file.js')
  , MemPL = require('../../../src/server/persistance/memory.js')
  ;

module.exports = {
  asSam: loggedInAs.bind(null, 'Sam', 'sam'),
  loggedInAs: loggedInAs,
  inGame: inGame
}

function loggedInAs(name, password, sub) {
  describe('logged in as ' + name, function () {
    beforeEach(function (done) {
      var PlClass = MemPL
        , deltaNumber = 10
      MakeApp(function (app) {
        this.app = app
        this.agent = request.agent(app);
        this.agent.post('/user/login')
          .send({username: name, password: password})
          .expect(200, function (err) {
            if (err) {
              console.error('HTTP Error', res.text);
            }
            done(err);
          })
      }.bind(this), PlClass, deltaNumber, testConfig);
    });
    sub();
  });
}

function inGame(gameid, sub) {
  describe('in game ' + gameid, function () {
    beforeEach(function (done) {
      this.agent.post('/games/join')
        .send({id: gameid})
        .send({color: 'orange'})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            console.error('HTTP Error:', res.text);
          }
          this.agent.saveCookies(res);
          done(err);
        }.bind(this));
    });
    sub();
  });
}

