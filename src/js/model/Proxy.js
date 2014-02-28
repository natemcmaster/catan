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
function Proxy(onNewModel) {
	this.onNewModel = onNewModel;
	this.autoPoll = true;
	if('undefined' !== typeof window){
		window.resumePolling = function(){this.autoPoll=true;}.bind(this);
		window.pausePolling = function(){this.autoPoll=false;}.bind(this);
	}
}

Proxy.prototype.startPolling = function() {
	var autoUpdate = function() {
		if(!this.autoPoll)
			return;
		this.getModel(function(err,data){this.onNewModel(data);}.bind(this));
		setTimeout(autoUpdate, 1000);
	}.bind(this);

	setTimeout(autoUpdate, 1000);
}


/**
 * Optional "done" arg called with data
 */
Proxy.prototype.executeCommand = function(command, done) {
	var onNewModel = this.onNewModel;
	jQuery.ajax({
		url: command.getURL(),
		data: JSON.stringify(command.getData()),
		contentType:'application/json',
		dataType: 'JSON',
		type: 'POST',
	})
		.done(function(data) {
			onNewModel(data);
      done && done(data)
		})
		.fail(function(xhr, status) {
			console.error('Failed to get stuff from server', status, xhr);
		});

};

Proxy.prototype.getModel = function(callback) {
	jQuery.get('/game/model').done(function (data, status) {
		callback(null, data);
    })
		.fail(function(xhr, status){
			console.error('failed to get model', xhr, status);
		});
};
