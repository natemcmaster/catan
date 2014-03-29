var expect = require('chai').expect,
	Injector = require('../../../../src/common/Injector'),
	GameRepo = require('../../../../src/server/repo/mem/GameRepo'),
	model = require('../../../../src/server/model'),
	CatanError = require('../../../../src/common/Errors').CatanError;

function flatten(obj, d) {
	d = d || {};
	for (var x in obj) {
		if (typeof obj[x] === 'object') {
			flatten(obj[x], d);
		} else if (typeof obj[x] === 'function') {
			d[x] = obj[x];
		}
	}
	return d;
}

var runtime = flatten(model);

describe('GameRepoTest', function(s) {
	var gameRepo;
	var injector = new Injector();
	injector.map(runtime);
	injector.register('GameRepo', GameRepo);
	beforeEach(function() {
		gameRepo = injector.create('GameRepo');
	});
	describe('#create',function(){
		it('with randomTiles', function() {
			var game = gameRepo.create('testGame', true, false, false);
			expect(game.model.toJSON().map.hexGrid).to.not.deep.equal(gameRepo.blank.map.hexGrid);
		});
		it('with randomNumbers', function() {
			var game = gameRepo.create('testGame', false, true, false);
			expect(game.model.toJSON().map.numbers).to.not.deep.equal(gameRepo.blank.map.numbers);
		})
		it('with randomPorts', function() {
			var game = gameRepo.create('testGame', false, false, true);
			expect(game.model.toJSON().map.ports).to.not.deep.equal(gameRepo.blank.map.ports);
		})
	});
	it('#read',function(){
		expect(gameRepo.read(1)).to.be.ok;
		expect(gameRepo.read(1234234)).to.not.be.ok;
	});
	it('#update',function(){
		expect(function(){gameRepo.update(233235,null)}).to.throw(CatanError);
	})
	it('#delete',function(){
		gameRepo.delete(0);
		expect(gameRepo.read(0)).to.not.be.ok;
	})


});