/**
 * 
 * @module catan.model
 * @namespace model
 */

module.exports = Proxy;

/**
 * Keeps track of the Proxy
 * <pre>
 * 
 * </pre>
 * @class Proxy
 * @constructor
 */
function Proxy(onNewModel){
	// constructor
	this.onNewModel = onNewModel;
}

Proxy.prototype.executeCommand = function(command){
	var onNewModel = this.onNewModel;
	jQuery.post(command.getURL(), command.getData())
		.done(function(data, status, xhr){
			onNewModel(data);
		})
		.fail(function (xhr, status) {
			console.error('Failed to get stuff from server', status, xhr);
		});

}

Proxy.prototype.getModel = function(callback){

	jQuery.get('/game/model')
		.done(callback)
		.fail(function(xhr, status){
			console.error('failed to get model', xhr, status);
		});


}