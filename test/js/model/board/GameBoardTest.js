var fixture = require('./example.json'),
	expect = require('chai').expect,
	GameBoard = require('./impl').GameBoard,
	HexLocation = require('./impl').map.hexgrid.HexLocation,
	MockProxy = require('../../MockProxy'),
	expect = require('chai').expect;

suite('GameBoard', function() {
		suite('#constructor', function() {
			var gb;
			setup(function() {
				gb = new GameBoard(null, fixture)
			})
			test('should understand game over', function() {
				expect(gb.isGameOver()).to.be.false;
			})
			test('should poppulate largestArmyOwner', function() {
				expect(gb.bigArmyOwner()).to.equal(2)
			})
			test('should poppulate longestRoadOwner', function() {
				expect(gb.longRoadOwner()).to.equal(0)
			})
			test('should populate other stuff', function() {
				expect(gb.players).to.be.ok;
				expect(gb.bank).to.be.ok;
				expect(gb.deck).to.be.ok;
			})
		});

		suite('integration with proxy', function() {
			var mockProxy, gb;
			setup(function() {
				mockProxy = new MockProxy;
				gb = new GameBoard(mockProxy, fixture);
			});
			test('#robPlayer()', function() {
				var expected = {
					'type': 'robPlayer',
					'playerIndex': 1,
					'victimIndex': 2,
					'robberSpot': {
						'x': -3,
						'y': 0
					}
				};

				gb.robPlayer(expected.playerIndex, expected.victimIndex, new HexLocation(-3, 0));

				expect(mockProxy.lastCommand.getData()).to.deep.equal(expected);
			});

		});
	});