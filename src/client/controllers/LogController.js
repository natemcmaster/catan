module.exports = LogController;

var BaseCommController = require('./BaseCommController');

/**
	The controller class for the Log
	@class LogController 
	@constructor
	@extends comm.BaseCommController
	@param {comm.LogView} logView The view for this object to control.
	@param {models.ClientModel} model The view for this object to control.
 */

function LogController(logView, model) {
	BaseCommController.call(this, logView, model);
	LogController.prototype.commType = 'log';
	this.onUpdate();
}

LogController.prototype = core.inherit(BaseCommController.prototype);
LogController.prototype.constructor = LogController;