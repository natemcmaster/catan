var FilePL = require('../../../src/server/persistance/file.js');
var fs = require('fs');
var expect = require('chai').expect;
var originalUsers = require('../initial_data/users.json');
var game0 = require('../initial_data/game0.json');
var game1 = require('../initial_data/game1.json');
var game2 = require('../initial_data/game2.json');

describe('FilePL tests', function() {
	var filePL;

	before(function(done) {
		try {
			fs.realpath('../initial_data', null, function (err, resolvedPath) {
				console.log(err);
				console.log(resolvedPath);
	  			if (err) throw err;
	  			filePL = new FilePL(resolvedPath);
	  			done();
			});
		}

		catch (err) {
			filePL = new FilePL();
			done(err);
		}
	})

	it.only('#readAllUsers() when starting server', function(done) {
		console.log("Where are we?");
		//console.log(originalUsers);
		//console.log(filePL.rootPath);
		filePL.readAllUsers(function(error, users){
			//console.log(error);
			//console.log(users);


			expect(error).to.be.null;
			expect(users).to.deep.equal(originalUsers);
			done();
		})
	})

	it('#getAllGameInfo() when starting server', function(done) {
		//console.log(game0);

		filePL.getAllGameInfo(function(error, games){
			expect(error).to.be.null;
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
