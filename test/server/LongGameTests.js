
var expect = require('chai').expect
  , request = require('supertest')
  , debug = require('debug')('catan:tests:long')
  , MakeApp = require('../../src/server/catan')
  , h = require('./commands/helpers')
  ;

describe('Long Test Examples', function () {
  h.loggedInAs('Nate', 'nate', function () {
    h.inGame(0, function () {
      it('should go through setup phase', function (done) {
        var app = this.app
          , agent = this.agent
          , game = app.gameRoom.getGameModel(0)
          , sam = game.players[0];

        expect(game.turnTracker.getStatus()).to.equal('FirstRound');

        runCommands(agent, game, done, [
          {
            name: 'buildRoad',
            data: {
              playerIndex: 0,
              roadLocation: {
                x: 0,
                y: 0,
                direction: 'N',
              },
              free: true
            },
          },
          {
            name: 'buildSettlement',
            data: {
              playerIndex: 0,
              vertexLocation: {
                x: 0,
                y: 0,
                direction: 'NW'
              },
              free: true
            }
          },
          {
            name: 'finishTurn',
            data: { playerIndex: 0 },
          },
          {
            name: 'finishTurn',
            data: { playerIndex: 1 }
          },
          {
            name: 'finishTurn',
            data: { playerIndex: 2 }
          },
          {
            name: 'finishTurn',
            data: { playerIndex: 3 },
            check: function (game) {
              expect(game.turnTracker.getStatus()).to.equal('SecondRound');
            }
          },
          {
            name: 'finishTurn',
            data: {playerIndex: 3}
          },
          {
            name: 'finishTurn',
            data: {playerIndex: 2}
          },
          {
            name: 'finishTurn',
            data: {playerIndex: 1}
          },
          {
            name: 'finishTurn',
            data: {playerIndex: 0},
            check: function (game) {
              expect(game.turnTracker.getStatus()).to.equal('Rolling');
            }
          },
          {
            name: 'finishTurn',
            data: { playerIndex: 0 },
            check: function (game) {
              // expect(game.turnTracker.getCurrentPlayerIndex()).to.equal(1);
            }
          },
          {
            name: 'finishTurn',
            data: { playerIndex: 1 },
            check: function (game) {
              // expect(game.turnTracker.getCurrentPlayerIndex()).to.equal(2);
            }
          },
          {
            name: 'finishTurn',
            data: { playerIndex: 2 },
            check: function (game) {
              // expect(game.turnTracker.getCurrentPlayerIndex()).to.equal(3);
            }
          },
          {
            name: 'finishTurn',
            data: { playerIndex: 3 },
            check: function (game) {
              // expect(game.turnTracker.getStatus()).to.equal('Rolling');
              // expect(game.turnTracker.getCurrentPlayerIndex()).to.equal(0);
            }
          },
        ]);

      });
    });
  });
  h.loggedInAs('Sam', 'sam', function () {
    h.inGame(1, function () {
      it('should do a lot good things', function (done) {
        var app = this.app
          , agent = this.agent
          , game = app.gameRoom.getGameModel(1)
          , sam = game.players[0];
        var moves = [
          // it's sam's turn
          {
            name: 'rollNumber',
            data: {
              number: 3,
              playerIndex: 0,
            },
            check: function (game) {
              expect(game.turnTracker.getStatus()).to.eql('Playing');
            }
          },
          {
            name: 'finishTurn',
            data: {
              playerIndex: 0
            },
            check: function (game) {
              expect(game.turnTracker.getStatus()).to.eql('Rolling');
              expect(game.turnTracker.getCurrentPlayerIndex()).to.eql(1);
            }
          }
        ]
        runCommands(agent, game, done, moves);
      })
    })
  })
})

function runCommands(agent, game, done, moves) {
  function next() {
    if (moves.length === 0) {
      return done()
    }
    var cmd = moves.shift();
    debug('command', cmd.name);
    agent.post('/moves/' + cmd.name)
      .send(cmd.data)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error('HTTP Error:', res.text);
          return done(err);
        }
        if (cmd.check) cmd.check(game);
        next();
      });
  }
  next();
}
