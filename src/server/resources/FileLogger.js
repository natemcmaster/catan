module.exports = FileLogger;
var tmp = require('tmp'),
fs=require('fs');

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

function FileLogger(path) {
	this._lvl = LEVEL.INFO;
	path = path || './server.log';
	try{
		fs.openSync(path,'a');
	} catch(e){
		tmp.file({prefix: 'mocha-', postfix: '.log', keep:true },function _tempFileCreated(err, p, fd) {
		  if (err) throw err;
		  path = p;
		  console.log('Created log file in ' + p);
		});
	} finally{
		this.filepath = path;
	}
}

FileLogger.LEVEL = LEVEL;

FileLogger.prototype.setLogLevel = function(levelName,cb) {
	this._lvl = 0;
	levelName = levelName.toUpperCase()
	var l = LEVEL[levelName];
	if(!l && l!==0){
		cb(true,'Unknown level '+levelName);
		return;
	}
	fs.appendFile(this.filepath,'Changing to log level ['+levelName+']\n');
	for(var i in LEVEL){
		if(LEVEL[i] <= l)
			this._lvl |= LEVEL[i];
	}
	cb(null,levelName);
}

FileLogger.prototype.log = function(message,level) {
	level = (level || 'INFO').toUpperCase();
	var l = LEVEL[level];
	if(l & this._lvl)
		fs.appendFile(this.filepath,new Date().toString() + ' ['+level+'] ' + message + '\n');
}

FileLogger.prototype.info = function(message) {
	this.log(message,'INFO');
}

FileLogger.prototype.warn = function(message) {
	this.log(message,'WARNING');
}

FileLogger.prototype.error = function(message) {
	this.log(message,'SEVERE');
}
