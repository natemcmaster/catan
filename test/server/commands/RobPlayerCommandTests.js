var h = require('./helpers'),
	_ = require('lodash'),
	expect = require('chai').expect;

function sum(c) {
	return _(c).reduce(function(sum, num) {
		return sum + num;
	}, 0);
}

describe('RobPlayerCommand', function() {
	h.asSam(function() {
		h.inGame(2, function() {

			it('transfers resources', function(done) {
				var game = this.app.gameRoom.getGameModel(2);

				expect(sum(game.players[2].resources)).to.equal(3);
				expect(sum(game.players[3].resources)).to.equal(8);
				expect(game.map.data.robber).to.deep.equal({
					"x": -2,
					"y": 1
				});
				this.agent.post('/moves/robPlayer')
					.send({
						location: {
							x: 0,
							y: 1,
						},
						victimIndex: 3,
						playerIndex: 2
					})
					.expect(200)
					.end(function(err, res) {
						if (err) {
							console.error(res.text);
							return done(err);
						}
						var game = this.app.gameRoom.getGameModel(2);
						expect(sum(game.players[2].resources)).to.equal(4);
						expect(sum(game.players[3].resources)).to.equal(7);
						expect(game.map.data.robber).to.deep.equal({
							"x": 0,
							"y": 1
						});
						delete this.app;
						done();
					}.bind(this));
			});
			it('only moves the robber', function(done) {
				var game = this.app.gameRoom.getGameModel(2);

				expect(sum(game.players[2].resources)).to.equal(3);
				expect(game.map.data.robber).to.deep.equal({
					"x": -2,
					"y": 1
				});
				this.agent.post('/moves/robPlayer')
					.send({
						location: {
							x: 1,
							y: 1,
						},
						victimIndex: -1,
						playerIndex: 2
					})
					.expect(200)
					.end(function(err, res) {
						if (err) {
							console.error(res.text);
							return done(err);
						}
						var game = this.app.gameRoom.getGameModel(2);
						expect(sum(game.players[2].resources)).to.equal(3);
						expect(game.map.data.robber).to.deep.equal({
							"x": 1,
							"y": 1
						});

						done();
					}.bind(this));
			});
		});
	});
	h.loggedInAs('Nate', 'nate', function() {
		h.inGame(0, function() {
			it('only does not rob from players who have nothing', function(done) {
				var game = this.app.gameRoom.getGameModel(0);

				expect(sum(game.players[0].resources)).to.equal(0);
				expect(sum(game.players[1].resources)).to.equal(0);

				this.agent.post('/moves/robPlayer')
					.send({
						location: {
							x: 1,
							y: 1,
						},
						victimIndex: 1,
						playerIndex: 0
					})
					.expect(200)
					.end(function(err, res) {
						if (err) {
							console.error(res.text);
							return done(err);
						}
						var game = this.app.gameRoom.getGameModel(0);
						expect(sum(game.players[0].resources)).to.equal(0);
						expect(sum(game.players[1].resources)).to.equal(0);
						done();
					}.bind(this));
			})
		})
	})
})
