
var expect = require('chai').expect
  , request = require('supertest')
  , MakeApp = require('../../src/server/catan')
  , testConfig = require('../test-config')
  , h = require('./commands/helpers')
  , MemoryPL = require('../../src/server/persistance/memory.js')
  ;

describe('GameRoom endpoints', function () {
  var app, agent;
  beforeEach(function (done) {
    MakeApp(function (app) {
      app = app
      agent = request.agent(app)
      done()
    }, MemoryPL, 10, testConfig);
  });

  describe('login', function () {

    it('should login', function (done) {
      agent.post('/user/login')
        .send({username: 'Jared', password: 'jared'})
        .expect(200, function (err) {
          if (err) {
            console.error('HTTP Error', res.text);
          }
          done(err);
        })
    });

    it('should reject bad password', function (done) {
      agent.post('/user/login')
        .send({username: 'Jared', password: 'moose'})
        .expect(401, done);
    });

    it('should reject bad username', function (done) {
      agent.post('/user/login')
        .send({username: 'Moose', password: 'moose'})
        .expect(401, done);
    });
  });
  describe('register', function () {
    it('should register', function (done) {
      agent.post('/user/register')
        .send({username: 'Moose', password: 'moose'})
        .expect(200, done)
    });

    it('should reject creating a user that already exists', function (done) {
      agent.post('/user/register')
        .send({username: 'Sam', password: 'moose'})
        .expect(400, done)
    });

    it('should reject creating a user without a username', function (done) {
      agent.post('/user/register')
        .send({password: 'moose'})
        .expect(400, done)
    });

    describe('with a newly registerd user', function (done) {
      beforeEach(function (done) {
        agent.post('/user/register')
          .send({username: 'Moose', password: 'moose'})
          .expect(200, done)
      });
      it('should allow login', function (done) {
        agent.post('/user/login')
          .send({username: 'Moose', password: 'moose'})
          .expect(200, done)
      });
    });
  })

  describe('list games', function () {

    beforeEach(function (done) {
      agent.post('/user/login')
        .send({username: 'Jared', password: 'jared'})
        .expect(200, function (err, res) {
          agent.saveCookies(res)
          done(err);
        });
    });

    it('should work', function (done) {
      agent.get('/games/list')
        .expect(200, function (err, res) {
        if (err) {
          console.error('HTTP Error', res.text);
        }
        done(err);
      })
    });
  });

  describe('create game', function () {

    beforeEach(function (done) {
      agent.post('/user/login')
        .send({username: 'Jared', password: 'jared'})
        .expect(200, function (err, res) {
          agent.saveCookies(res)
          done(err);
        });
    });

    it('should work', function (done) {
      agent.post('/games/create')
        .send({name: 'TheOneGame'})
        .expect(200, done);
    });

    it('should make random', function (done) {
      agent.post('/games/create')
        .send({
          name: 'TheRandomGame',
          randomTiles: true,
          randomHexes: true
        })
        .expect(200, done);
    });

  });

  describe('join game', function () {

    beforeEach(function (done) {
      agent.post('/user/login')
        .send({username: 'Jared', password: 'jared'})
        .expect(200, function (err, res) {
          agent.saveCookies(res)
          done(err);
        });
    });

    it('should work', function (done) {
      agent.post('/games/join')
        .send({id: 0, color: 'red'})
        .expect(200, done);
    });

    it('should prevent joining a full game', function (done) {
      agent.post('/games/join')
        .send({id: 1, color: 'red'})
        .expect(400, done);
    });
  });

  describe('get game model', function () {
    beforeEach(function (done) {
      agent.post('/user/login')
        .send({username: 'Jared', password: 'jared'})
        .expect(200, function (err, res) {
          agent.saveCookies(res)
          agent.post('/games/join')
            .send({id: 0, color: 'red'})
            .expect(200, function (err, res) {
              agent.saveCookies(res)
              done(err)
            });
        });
    });

    it('should work', function (done) {
      agent.get('/game/model')
        .expect(200, done);
    });
  });

  describe('change log level', function () {
    it('should fail to change to an invalid log level', function (done) {
      agent.post('/util/changeLogLevel')
        .send({logLevel: 'BadLevel'})
        .expect(400, done);
    });
    it('should work', function (done) {
      agent.post('/util/changeLogLevel')
        .send({logLevel: 'ALL'})
        .expect(200, done);
    });
  });


});



