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
}

PointController.prototype.onUpdate = function() {
	var clientPlayer = this.clientModel.getClientPlayer()
	var clientPlayerPoints = clientPlayer.victoryPoints
	this.view.setPoints(clientPlayerPoints)
	
	if(clientPlayerPoints >= clientPlayer.MAX_GAME_POINTS){
		//How to appropriatly set winner in game finished view
		this.gameFinishedView.showModal()
	}
};

// STUDENT-REMOVE-END

