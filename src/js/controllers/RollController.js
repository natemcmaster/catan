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
};

/**
 * This is called from the roll result view.  It should close the roll result view and allow the game to continue.
 * @method closeResult
 * @return void
 **/
RollController.prototype.closeResult = function(){
	this.getRollResultView().closeModal();
};

/**
 * This method generates a dice roll
 * @method rollDice
 * @return void
 **/
RollController.prototype.rollDice = function(){
	clearTimeout(this.autoRoll);
	clearTimeout(this.countDown);
	var currentPlayerId = this.clientModel.getCurrentPlayer().playerID;
	var randomRollNumber = getRandomInt(2, 12);
	this.view.closeModal();
	this.getRollResultView().setAmount(randomRollNumber);
	this.getRollResultView().showModal();
	this.clientModel.gameboard.turnTracker.rollDice(randomRollNumber);
};

/**
* 
* @param{int} low end of random number range
* @param{int} high end of random number range
* @return{int} a random number between low end and high end
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


RollController.prototype.onUpdate = function() {
	if (this.clientModel.isMyTurn() && this.clientModel.getCurrentStatus() == 'Rolling')
	{
		this.view.showModal();
		var count = 5;
		var test = this;
		this.autoRoll = setTimeout(function(){test.rollDice()}, 5000);
		test.view.changeMessage('Rolling automatically in... ' + count);
		this.countDown = setInterval(function(){
			count--;
			test.view.changeMessage('Rolling automatically in... ' + count);
			
			
		}, 1000);

		

		
	}
};
