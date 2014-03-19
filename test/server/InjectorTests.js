var expect = require('chai').expect

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

	it('#recursive injection', function() {
		function One(num, $One) {
			if (num > 0) this.child = $One(num - 1);
			else this.child = null;
		}
		inj.register('One', One);
		var inst = inj.create('One', 2);
		expect(inst.child).to.be.ok;
		expect(inst.child.child).to.be.ok;
		expect(inst.child.child.child).to.not.be.ok;
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
		var inst = inj.create('One', 2);
		expect(inst.two.one).to.be.ok;
		expect(inst.two.one.two).to.not.be.ok;
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
})