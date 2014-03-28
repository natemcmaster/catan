module.exports = ConsoleLogger;

var LEVEL = {
	ALL: 128,
	SEVERE: 64,
	WARNING: 32,
	INFO: 16,
	CONFIG: 8,
	FINE: 4,
	FINER: 2,
	FINEST: 1,
	OFF: 0
};

function ConsoleLogger(cnsl) {
	this.console = cnsl || console;
	this._lvl = 16;
}

ConsoleLogger.LEVEL = LEVEL;

ConsoleLogger.prototype.setLogLevel = function(levelName,cb) {
	this._lvl = 0;
	levelName = levelName.toUpperCase()
	var l = LEVEL[levelName];
	if(!l && l!==0){
		cb(true,'Unknown level '+levelName);
		return;
	}
	this._lvl = l;
	cb(null,levelName);
}

ConsoleLogger.prototype.log = function(message,level) {
	level = (level || 'INFO').toUpperCase();
	var l = LEVEL[level];
	if(l && l >= this._lvl)
		this.console.log('['+level+'] ' + message);
}

ConsoleLogger.prototype.info = function(message) {
	this.log(message,'INFO');
}

ConsoleLogger.prototype.warn = function(message) {
	this.log(message,'WARNING');
}

ConsoleLogger.prototype.error = function(message) {
	this.log(message,'SEVERE');
}