var Proxy = require('./impl').Proxy,
	expect = require('chai').expect,
	FakeQuery = require('../FakeQuery'),
	AbstractCommand = require('./impl').commands.AbstractCommand;

global.jQuery = FakeQuery;

suite('ProxyTest', function() {

	var cmdFactory = (function factory() {
		function cmd() {}
		cmd.prototype = new AbstractCommand;
		cmd.constructor = AbstractCommand;

		return function(url, data) {
			cmd.prototype.url = url;
			cmd.prototype.getData = function() {
				return data;
			}
			return new cmd;
		}
	})();

	suite('#executeCommand()', function() {

		test('it prepares and sends a post request', function() {
			var loadedGameModel = false;
			var proxy = new Proxy(function() {
				loadedGameModel = true;
			});
			var testCase = {
				description: '',
				url: 'testurl.com',
				data: {
					'unit': 'testing'
				}
			};

			proxy.executeCommand(cmdFactory(testCase.url, testCase.data));
			var request = FakeQuery.lastRequest();
			request.runDone();

			expect(request.options.url).to.equal(testCase.url);
			expect(request.options.data).to.deep.equal(testCase.data);
			expect(loadedGameModel).to.be.true;
		});

		test('it loads up the new game model', function() {
			var proxy = new Proxy(null);
			var testResponse = {
				map: {
					hexes: ['a', 'b']
				},
				ports: [1, 2, 3]
			};
			var request, response;
			FakeQuery.ajaxPrefilter(function(r) {
				if (r.options.url == '/game/model') {
					request = r;
				}
			})
			var gotModel = false;

			proxy.getModel(function(d) {
				gotModel = true;
				response = d;
			});
			request.runDone(testResponse);
			expect(gotModel).to.be.true;
			expect(response).to.deep.equal(testResponse);
		});

	});


});