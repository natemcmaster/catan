var expect = require('chai').expect,
	ConsoleLogger = require('../../../src/server/resources').ConsoleLogger;

describe('ConsoleLogger', function() {
	var logger, entries;
	beforeEach(function() {
		var console = {
			log: function(msg) {
				entries.push(msg);
			}
		}
		logger = new ConsoleLogger(console);
		entries = [];
	});
	it('#log', function() {
		logger.log('Four');
		expect(entries).to.deep.equal(['[INFO] Four']);
	});
	it('#warn', function() {
		logger.warn('score');
		expect(entries).to.deep.equal(['[WARNING] score']);
	});
	it('#info', function() {
		logger.info('and');
		expect(entries).to.deep.equal(['[INFO] and']);
	});
	it('#error', function() {
		logger.error('seven');
		expect(entries).to.deep.equal(['[SEVERE] seven']);
	});
	it('#unknown levels', function(done) {
		logger.setLogLevel('years',function(err,msg){
			expect(err).to.be.ok;
			expect(msg).to.have.string('Unknown');
			done();
		})
	});
	it('#setLogLevel', function(done) {
		logger.setLogLevel('seVeRe',function(err,msg){
			expect(err).to.be.not.ok;
			expect(msg).to.be.string('SEVERE');
			done();
		})
	});

})