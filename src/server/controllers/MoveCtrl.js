'use strict';
var HttpError = require('../../common/').Errors.HttpError;

module.exports = MoveCtrl;

var fs = require('fs');
var path = require('path'),
	util = require('util');

var BaseCtrl = require('./BaseCtrl');

function MoveCtrl(app, inj) {
	BaseCtrl.call(this, app, inj);

}
util.inherits(MoveCtrl, BaseCtrl);

var cmdMap = {
  sendChat: 'SendChatCommand',

  robPlayer: 'RobPlayerCommand',
  rollNumber: 'RollDiceCommand',
  finishTurn: 'FinishTurnCommand',
  buyDevCard: 'BuyDevCardCommand',

  Soldier: 'SoldierCommand',
  Monopoly: 'MonopolyCommand',
  Monument: 'MonumentCommand',
  Road_Building: 'RoadBuildingCommand',
  Year_of_Plenty: 'YearOfPlentyCommand',

  buildRoad: 'BuildRoadCommand',
  buildCity: 'BuildCityCommand',
  buildSettlement: 'BuildSettlementCommand',

  offerTrade: 'OfferTradeCommand',
  acceptTrade: 'AcceptTradeCommand',
  maritimeTrade: 'MaritimeTradeCommand',
  discardCards: 'DiscardCardsCommand',
}

MoveCtrl.prototype.assignRoutes = function(app, h) {
	//replace all actions with their dependency injected version
	for(var routeName in cmdMap){
    app.post('/moves/' + routeName, this.commandRoute.bind(this, cmdMap[routeName]));
	}
}
