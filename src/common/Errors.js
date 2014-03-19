function Error(message) {
	this.message = message;
}

Error.prototype.toString = function() {
	return this.constructor.toString() + ': ' + this.message;
}

function InjectorError() {}
InjectorError.prototype = Object.create(Error);
InjectorError.constructor = InjectorError;


exports.InjectorError = InjectorError;