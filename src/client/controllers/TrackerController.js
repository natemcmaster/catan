//STUDENT-EDITABLE-BEGIN
/**
The namespace for the turn tracker

@module catan.turntracker
@namespace turntracker
**/

module.exports = TurnTrackerController;

var window = window || {};
var catan = window.catan || {};
catan.turntracker = catan.turntracker || {};

var Controller = require('./BaseController');

/**
	The controller class for the Turn Tracker
	@class TurnTrackerController 
	@extends misc.BaseController
	@param {turntracker.View} view The view for this object to control.
	@param {models.ClientModel} clientModel The clientModel for this object to control.
	@constructor
 **/
function TurnTrackerController(view, clientModel) {
	Controller.call(this, view, clientModel);

	var player = this.clientModel.getClientPlayer();
	this.view.setClientColor(player.color);

	var players = this.clientModel.gameboard.players;
	for (var j = 0; j < players.length; j++) {
		this.view.initializePlayer(j, players[j].name, players[j].color)
	}
	this.updatePlayers();
}

core.forceClassInherit(TurnTrackerController, Controller);

/**
 * Called by the view when the local player ends their turn.
 * @method endTurn
 * @return void
 */
TurnTrackerController.prototype.endTurn = function() {
	this.clientModel.endMyTurn();
	this.view.updateStateView(false, 'Ending turn');
}

TurnTrackerController.prototype.onUpdate = function() {
	this.updatePlayers();
	var status = this.clientModel.getCurrentStatus();

	if (!this.clientModel.isMyTurn() || status == 'Discarding') {
		this.view.updateStateView(false, "Waiting for other players... " + status);
	} 
	else if (this.clientModel.canEndTurn()) {
		this.view.updateStateView(true, 'Click Here to End Your Turn')
	} else {
		this.view.updateStateView(false, status);
	}
}

TurnTrackerController.prototype.updatePlayers = function() {

	var players = this.clientModel.gameboard.players;
	for (var i = 0; i < players.length; i++) {
		var update = {
			'playerIndex': i,
			'score': players[i].victoryPoints,
			'highlight': (i == this.clientModel.gameboard.turnTracker.currentPlayerIndex()),
			'army': players[i].largestArmy,
			'road': players[i].longestRoad
		};
		this.view.updatePlayer(update);
	}

}