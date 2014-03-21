module.exports = ConsoleLogger;

function ConsoleLogger(){

}

ConsoleLogger.prototype.log = function(message){
	console.log('[LOG] ' + message);
}

ConsoleLogger.prototype.info = function(message){
	console.log('[INFO] ' + message);
}