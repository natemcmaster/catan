module.exports = ConsoleLogger;

function ConsoleLogger(){

}

ConsoleLogger.prototype.log = function(message){
	console.log('[LOG] ' + message);
}

ConsoleLogger.prototype.info = function(message){
	console.log('[INFO] ' + message);
}

ConsoleLogger.prototype.warn = function(message){
	console.log('[WARN] ' + message);
}

ConsoleLogger.prototype.error = function(message){
	console.log('[ERROR] ' + message);
}