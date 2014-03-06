
module.exports = StatefulController;

var Controller = require('./BaseController');

/** 
	@class StatefulController
	@constructor 
	@extends misc.BaseController
	@param view - The controller's view
	@param {models.ClientModel} clientModel - The controller's client model
	*/
function StatefulController(view, clientModel) {
	Controller.call(this, view, clientModel);
}

core.forceClassInherit(StatefulController, Controller);

StatefulController.prototype.onUpdate = function() {
	var state = this.getState();
	this.stateHandlers[state].call(this)
}

// To use this class, you need to make a getState() -> str function and an
// object stateHandlers {str: fn()}

/*

MyController.prototype.getState = function () {
  return 'defaultState'
}

MyController.prototype.stateHandlers = {
  defaultState: function () {
    this.view.doSomething()
  }
}

*/
