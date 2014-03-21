var expect = require('chai').expect
var InjectorError = require('../../src/common/Errors').InjectorError;

describe('Injector', function() {
	var Injector, inj;
	before(function() {
		Injector = require('../../src/common/Injector.js');
	})

	beforeEach(function() {
		inj = new Injector();
	});

	it('#no injection', function() {
		function One(num) {
			this.num = num * 5;
		}
		inj.register('One', One);
		var inst = inj.create('One', 10);
		expect(inst.num).to.equal(50);
	})

	it('#basic injection', function() {
		function One($Two) {
			this.two = $Two(5);
		}

		function Two(num) {
			this.num = num * 2;
		}
		inj.register('One', One);
		inj.register('Two', Two);

		var inst = inj.create('One');
		expect(inst.two.num).to.equal(10);
	})

	it('#static methods', function() {
		function One() {}
		One.staticMethod = function() {
			return 3
		}
		inj.register('One', One);
		var inst = inj.resolve('One');
		expect(inst.staticMethod).to.be.a('function')
		expect(inst.staticMethod()).to.equal(3);
	})

	it('#hexgrid static method', function() {
		var h = require('byu-catan').models.hexgrid.HexGrid;
		inj.register('HexGrid', h);
		var inst = inj.resolve('HexGrid');
		expect(inst.getRegular).to.be.a('function');
	})

	it('#hexgrid nested static method', function() {
		var h = require('byu-catan').models.hexgrid.HexGrid;
		inj.register('HexGrid', h);
		var run=false;
		function Two($HexGrid){
			expect($HexGrid.getRegular).to.be.a('function');
			run=true;
		}
		inj.register('Two',Two);
		var t = inj.create('Two');
		expect(run).to.be.ok;
	})

	it('#recursive injection', function() {
		function One(num, $One) {
			if (num > 0) this.child = $One(num - 1);
			else this.child = null;
		}
		inj.register('One', One);
		var inst = function() {
			inj.create('One', 2)
		};
		expect(inst).to.
		throw (InjectorError);
	})

	it('#circular injection', function() {
		function One(n, $Two) {
			this.two = n > 0 ? $Two(n - 1) : null;
		}

		function Two(n, $One) {
			this.one = n > 0 ? $One(n - 1) : null;
		}
		inj.register('One', One);
		inj.register('Two', Two);
		var inst = function() {
			inj.create('One', 2)
		};
		expect(inst).to.
		throw (InjectorError);
	})

	it('#multi injection', function() {
		inj.register('One', function(a, b, c, $Two, $Three) {
			this.two = $Two(a);
			this.three = $Three(b, c);
		})
		inj.register('Two', function(a) {
			this.a = a;
		});
		inj.register('Three', function(b, c) {
			this.d = b * c;
		})
		var inst = inj.create('One', 1, 2, 3);
		expect(inst.two.a).to.equal(1);
		expect(inst.three.d).to.equal(6);
	})

	it('#injects anonymous functions', function() {
		inj.register('Taco', function(a) {
			this.b = a;
		});
		var func = inj.inject(function(num, $Taco) {
			return $Taco(num + 4);
		});
		var dyn = func(7);
		expect(dyn.b).to.equal(11);
	})
})