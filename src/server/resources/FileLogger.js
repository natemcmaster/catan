module.exports = TestLogger;
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

function TestLogger(path) {
	this._lvl = LEVEL.INFO;
	if(!path){
		tmp.file({prefix: 'mocha-', postfix: '.log', keep:true },function _tempFileCreated(err, path, fd) {
		  if (err) throw err;
		  this.file = fd;
		  this.filepath = path;
		  console.log('[logger] Log output found in ' + path);
		}.bind(this));
	}
	else{
		this.filepath = path;
	}
}

TestLogger.LEVEL = LEVEL;

TestLogger.prototype.setLogLevel = function(levelName,cb) {
	this._lvl = 0;
	levelName = levelName.toUpperCase()
	var l = LEVEL[levelName];
	if(!l && l!==0){
		cb(true,'Unknown level '+levelName);
		return;
	}
  console.log(this.filepath, 'path');
	fs.appendFile(this.filepath,'Changing to log level ['+levelName+']');
	for(var i in LEVEL){
		if(LEVEL[i] <= l)
			this._lvl |= LEVEL[i];
	}
	cb(null,levelName);
}

TestLogger.prototype.log = function(message,level) {
	level = (level || 'INFO').toUpperCase();
	var l = LEVEL[level];
  console.log(this, this.filepath);
	if(l & this._lvl)
		fs.writeFile(this.filepath,'['+level+'] ' + message);
}

TestLogger.prototype.info = function(message) {
	this.log(message,'INFO');
}

TestLogger.prototype.warn = function(message) {
	this.log(message,'WARNING');
}

TestLogger.prototype.error = function(message) {
	this.log(message,'SEVERE');
}
