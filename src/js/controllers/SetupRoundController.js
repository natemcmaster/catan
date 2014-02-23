//STUDENT-EDITABLE-BEGIN
/**
	This is the namespace for the intitial game round
	@module catan.setup
	@namespace setup
	*/

module.exports = SetupRoundController;

var Controller = require('./BaseController');

/** 
	@class SetupRoundController
	@constructor 
	@extends misc.BaseController
	@param {models.ClientModel} clientModel
	@param {map.MapController} mapController
	*/
function SetupRoundController(clientModel, mapController) {
	this.mapController = mapController;

	Controller.call(this, undefined, clientModel);

	this.onUpdate();
}

core.forceClassInherit(SetupRoundController, Controller);

SetupRoundController.prototype.onUpdate = function() {
	if (!this.clientModel.isMyTurn()) {
		//view.statusBar = "Waiting for other players";
		return;
	}
	var player = this.clientModel.getClientPlayer()
    , status = this.clientModel.getCurrentStatus();
  if (['FirstRound', 'SecondRound'].indexOf(status) === -1) {
    window.location.href = 'catan.html'
    return
  }
	if (player.roadsBuilt == player.settlementsBuilt) {
    if ([0, 'FirstRound', 'SecondRound'][player.roadsBuilt] === status) {
      return this.clientModel.endMyTurn();
    }
	}
  if (player.roadsBuilt > player.settlementsBuilt) {
		return this.mapController.startMove('settlement', true, false);
	} 
  this.mapController.startMove('road', true, true);
}

