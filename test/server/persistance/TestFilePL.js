var FilePL = require('../../../src/server/persistance/file.js');
var path = require('path');
var expect = require('chai').expect;
var originalUsers = require('../initial_data/users.json');
var game0 = require('../initial_data/game0.json');
var game1 = require('../initial_data/game1.json');
var game2 = require('../initial_data/game2.json');

describe('FilePL tests', function() {
	var filePL;

	before(function(done) {
		var rootPath = path.resolve(__dirname, '../initial_data');
		filePL = new FilePL(rootPath);
		done();
	})

	it('#readAllUsers() when starting server', function(done) {
		filePL.readAllUsers(function(error, users){
			expect(error).to.be.null;
			expect(users).to.deep.equal(originalUsers);
			done();
		})
	})

	it('#getAllGameInfo() when starting server', function(done) {
		filePL.getAllGameInfo(function(err, games){
			//console.log(err);
			//console.log(games);
			expect(err).to.be.null;
			expect(games[0]).to.equal(game0);
			expect(games[1]).to.equal(game1);
			expect(games[2]).to.equal(game2);
			done();
		})
	})
	
	it('#persistGame()', function(done) {
		done();
	})

	it('#persistUser()', function(done) {
		done();
	})

	it('#persistCommand()', function(done) {
		done();
	})

	it('#updateGame()', function(done) {
		done();
	})

	it('#getRecentGameCommands()', function(done) {
		done();
	})
})
