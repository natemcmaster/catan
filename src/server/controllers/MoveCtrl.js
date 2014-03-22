'use strict';
var HttpError = require('../../common/').Errors.HttpError;

module.exports = MoveCtrl;

var fs = require('fs');
var path = require('path'),
	util = require('util');
var sampleJson = JSON.parse(fs.readFileSync(path.join(__dirname, './_sampledata.json'))).model;

var BaseCtrl = require('./BaseCtrl');

function MoveCtrl(app, inj) {
	BaseCtrl.call(this, app, inj);

}
util.inherits(MoveCtrl, BaseCtrl);

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

MoveCtrl.prototype.assignRoutes = function(app, h) {
	//replace all actions with their dependency injected version
	for(var routeName in cmdMap){
    app.post('/moves/' + routeName, this.commandRoute.bind(this, cmdMap[routeName]));
	}
}

/*
var commands = {}
for (var name in cmdMap) {
  commands['/moves/' + name] = require('../model/commands/' + cmdMap[name]);
}

MoveCtrl.prototype.commands = commands;
var actions = {
	sendChat: function(q, r, $SendChatCommand) {
		r.json(sampleJson);
	},
	rollNumber: function(q, r) {
		r.json(sampleJson);
	},
	robPlayer: function(q, r) {
		r.json(sampleJson);
	},
	finishTurn: function(q, r) {
		r.json(sampleJson);
	},
	buyDevCard: function(q, r) {
		r.json(sampleJson);
	},
	Year_of_Plenty: function(q, r) {
		r.json(sampleJson);
	},
	Road_Building: function(q, r) {
		r.json(sampleJson);
	},
	Soldier: function(q, r) {
		r.json(sampleJson);
	},
	Monopoly: function(q, r) {
		r.json(sampleJson);
	},
	Monument: function(q, r) {
		r.json(sampleJson);
	},
	buildRoad: function(q, r) {
		r.json(sampleJson);
	},
	buildSettlement: function(q, r) {
		r.json(sampleJson);
	},
	buildCity: function(q, r) {
		r.json(sampleJson);
	},
	offerTrade: function(q, r) {
		r.json(sampleJson);
	},
	acceptTrade: function(q, r) {
		r.json(sampleJson);
	},
	maritimeTrade: function(q, r) {
		r.json(sampleJson);
	},
	discardCards: function(q, r) {
		r.json(sampleJson);
	},
};
*/
