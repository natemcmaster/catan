var FilePL = require('../../../src/server/persistance/file.js');
var path = require('path');
var expect = require('chai').expect;
var originalUsers = require('../data/users.json');
var game0 = require('../data/game0.json');
var game1 = require('../data/game1.json');
var game2 = require('../data/game2.json');

describe('FilePL tests', function() {
	var filePL;

	before(function(done) {
		var rootPath = path.resolve(__dirname, '../data');
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
			expect(err).to.be.null;
			expect(games[0]).to.deep.equal(game0);
			expect(games[1]).to.deep.equal(game1);
			expect(games[2]).to.deep.equal(game2);
			done();
		})
	})

	it('#getRecentGameCommands()', function(done) {
		filePL.getRecentGameCommands(game0.id, game0.last_command_id, function(err, commands){
			expect(err).to.be.null;
			expect(commands).to.deep.equal([]);
			done();
		})
	})
	
	it('#persistUser()', function(done) {
		var user = {id:101, username:'tester1', password:'testing123'};
		originalUsers.push(user);

		filePL.persistUser(user.username, user.password, function(err, id){
			expect(err).to.be.null;
			expect(id).to.equal(101);
			
			filePL.readAllUsers(function(error, users){
				expect(error).to.be.null;
				expect(originalUsers).to.deep.equal(users);
				done();
			})
		})
	})

	it('#persistUser() again', function(done) {
		var user = {id:102, username:'tester2', password:'testing123'};
		originalUsers.push(user);

		filePL.persistUser(user.username, user.password, function(err, id){
			expect(err).to.be.null;
			expect(id).to.equal(102);
			
			filePL.readAllUsers(function(error, users){
				expect(error).to.be.null;
				expect(originalUsers).to.deep.equal(users);
				done();
			})
		})
	})

	it('#persistGame()', function(done) {
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
