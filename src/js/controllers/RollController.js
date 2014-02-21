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
var RollDiceCommand = require('../model/commands/RollDiceCommand');

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
	this.closeModal();
}

/**
 * This method generates a dice roll
 * @method rollDice
 * @return void
 **/
RollController.prototype.rollDice = function(){
	var currentPlayerId = this.clientModel.getCurrentPlayer().playerID;
	var randomRollNumber = getRandomInt(2, 12);
	this.clientModel.proxy.executeCommand(new RollDiceCommand(currentPlayerId, randomRollNumber));	
};

/**
* 
* @param{int} low end of random number range
* @param{int} high end of random number range
* @return{int} a random number between low end and high end
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
