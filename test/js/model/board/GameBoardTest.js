
var fixture = require('./example.json')
  , expect = require('chai').expect
  , GameBoard = require('./impl').GameBoard;

suite('GameBoard', function () {
	suite('#constructor', function () {
		var gb
		setup(function () {
			gb = new GameBoard(null, fixture)
		})
		test('should understand game over', function () {
			expect(gb.isGameOver()).to.be.false;
		})
		test('should poppulate largestArmyOwner', function () {
			expect(gb.bigArmyOwner()).to.equal(2)
		})
		test('should poppulate longestRoadOwner', function () {
			expect(gb.longRoadOwner()).to.equal(0)
		})
		test('should populate other stuff', function () {
			expect(gb.players).to.be.ok;
			expect(gb.bank).to.be.ok;
			expect(gb.deck).to.be.ok;
		})
	})
})

