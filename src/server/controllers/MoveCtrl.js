'use strict';

module.exports = MoveCtrl;

var fs = require('fs');
var path = require('path');
var util = require('util')
var sampleJson = JSON.parse(fs.readFileSync(path.join(__dirname, './_sampledata.json'))).model;

var BaseCtrl = require('./BaseCtrl');

util.inherits(MoveCtrl, BaseCtrl);
function MoveCtrl(app) {
	BaseCtrl.call(this, app);
}

MoveCtrl.prototype = Object.create(BaseCtrl);
MoveCtrl.constructor = MoveCtrl;

var cmdMap = {
  sendChat: 'SendChatCommand',

  robPlayer: 'RobPlayerCommand',
  rollNumber: 'RollNumberCommand',
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
var commands = {}
for (var name in cmdMap) {
  commands['/moves/' + name] = require('../model/commands/' + cmdMap[name]);
}

MoveCtrl.prototype.commands = commands;


