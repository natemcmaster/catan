module.exports = ConsoleLogger;

function ConsoleLogger(){

}

ConsoleLogger.prototype.log = function(message){
	console.log('[log] ' + message);
}