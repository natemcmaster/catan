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
};
