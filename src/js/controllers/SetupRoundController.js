//STUDENT-EDITABLE-BEGIN
/**
	This is the namespace for the intitial game round
	@module catan.setup
	@namespace setup
	*/

module.exports = SetupRoundController;

var window = window || {};
var catan = window.catan || {};
catan.setup = catan.setup || {};

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
};

core.forceClassInherit(SetupRoundController, Controller);

SetupRoundController.prototype.onUpdate = function() {
	if (!this.clientModel.isMyTurn()) {
		//view.statusBar = "Waiting for other players";
		return;
	}
	var player = this.clientModel.getClientPlayer();
	if (player.roadsBuilt == player.settlementsBuilt && player.roadsBuilt == 2) {
		this.clientModel.endMyTurn();
	} else if (player.roads > player.settlements) {
		this.mapController.startMove('settlement', true, false);
	} else {
		this.mapController.startMove('road', true, true);

	}
}