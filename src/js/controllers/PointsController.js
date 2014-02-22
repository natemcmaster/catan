//STUDENT-EDITABLE-BEGIN


module.exports = PointController;

var window = window || {};
var catan = window.catan || {};
catan.points = catan.points || {};
catan.points.Controller = catan.points.Controller || {};

/**
	This is the namespace for point display
	@module catan.points
	@namespace points
	*/


var Controller = require('./BaseController');

PointController.prototype = core.inherit(Controller.prototype);

core.defineProperty(PointController.prototype, "GameFinishedView");

/** 
	@class PointController
	@constructor 
	@extends misc.BaseController
	@param {points.View} view
	@param {misc.GameFinishedView} gameFinishedView
	@param {models.ClientModel} clientModel
	*/
function PointController(view, gameFinishedView, clientModel){
	this.setGameFinishedView(gameFinishedView);
	Controller.call(this,view,clientModel);
	this.onUpdate();
}

PointController.prototype.onUpdate = function() {

	var clientPlayer = this.clientModel.getClientPlayer()
	this.view.setPoints(clientPlayer.victoryPoints)
	
	var players = this.clientModel.gameboard.players

	for(var i = 0; i< players.length; i++){

		if(players[i].victoryPoints >= players[i].MAX_GAME_POINTS){

			if(players[i] == clientPlayer){
				this.gameFinishedView.setWinner(players[i].name, true)
			}
			else{
				this.gameFinishedView.setWinner(players[i].name, false)
			}

			this.gameFinished.showModal();
			break;
		}
	}
	
	
};

// STUDENT-REMOVE-END

