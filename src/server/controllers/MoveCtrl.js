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

MoveCtrl.prototype.assignRoutes = function(app, h) {
	//replace all actions with their dependency injected version
	for(var a in actions){
		actions[a] = h(actions[a]);
	}
	app.post('/moves/:action', this.route);
}

MoveCtrl.prototype.route = function(q, r) {
	if ('function' === typeof actions[q.param('action')]) {
		this[q.param('action')](q, r);
	} else {
		throw new HttpError(404);
	}
}

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