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

core.defineProperty(PointController.prototype, "gameFinishedView");

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

	var pointStatus = this.clientModel.getPointStatus();

	this.view.setPoints(pointStatus.clientPoints);

	if(!this.gameFinishedView)
		return;

	if(pointStatus.winner) {
		this.gameFinishedView.setWinner(pointStatus.winner, pointStatus.isClient);
		this.gameFinishedView.showModal();
	}
	
};

