//STUDENT-EDITABLE-BEGIN
/**
	This is the namespace the rolling interface
	@module catan.roll
	@namespace roll
	*/

module.exports = RollController;

var window = window || {};
var catan = window.catan || {};
catan.roll = catan.roll || {};

var Controller = require('./BaseController');
var Controller = require('../model/commands/RollDiceCommand');

/**
 * @class RollController
 * @constructor
 * @extends misc.BaseController
 * @param{roll.View} view
 * @param{roll.ResultView} resultView
 * @param{models.ClientModel} clientModel
 */
core.forceClassInherit(RollController,Controller);

core.defineProperty(RollController.prototype,"rollResultView");

function RollController(view,resultView, clientModel){
	this.setRollResultView(resultView);
	Controller.call(this,view,clientModel);
	this.rollInterval = false;
	this.showRollResult = false;
	this.clientModel = clientModel;

};

/**
 * This is called from the roll result view.  It should close the roll result view and allow the game to continue.
 * @method closeResult
 * @return void
 **/
RollController.prototype.closeResult = function(){
}

/**
 * This method generates a dice roll
 * @method rollDice
 * @return void
 **/
RollController.prototype.rollDice = function(){
	this.clientModel.proxy.executeCommand(new RollDiceCommand());
	
};
