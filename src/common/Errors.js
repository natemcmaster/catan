var util = require('util');

function CatanError(message) {
	Error.call(this, message);
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name; 
	this.message = message; 
}
util.inherits(CatanError,Error);

CatanError.prototype.toString = function() {
	return this.constructor.name + ': ' + this.message;
}
/**
 * @class InjectorError
 * @constructor
 * @param {string} message Message about this error
 */
function InjectorError(m) {
	CatanError.call(this, m);
}
util.inherits(InjectorError, CatanError);

var http = {
	'200': 'OK',
	'304': 'Not Modified',
	'400': 'Bad Request',
	'401': 'Unauthorized',
	'403': 'Forbidden',
	'404': 'Not found',
	'418': 'I\'m a teapot',
	'500': 'Server error',
};

function HttpError(code, message) {
	CatanError.call(this, message || http[code] || 'Server Error');
	this.code = code;
}
util.inherits(HttpError, CatanError);


exports.InjectorError = InjectorError;
exports.HttpError = HttpError;
exports.CatanError = CatanError;