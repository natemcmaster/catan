'use strict';

module.exports = MoveCtrl;

var fs = require('fs');
var path = require('path');
var sampleJson = JSON.parse(fs.readFileSync(path.join(__dirname, './_sampledata.json'))).model;

var BaseCtrl = require('./BaseCtrl');

function MoveCtrl(app, model) {
	BaseCtrl.call(this, app, model);

}
MoveCtrl.prototype = Object.create(BaseCtrl);
MoveCtrl.constructor = MoveCtrl;

MoveCtrl.prototype.assignRoutes = function(app) {
	app.post('/moves/:action', this.route.bind(this));
}

MoveCtrl.prototype.route = function(q, r) {
	if ('function' === typeof this[q.param('action')]) {
		this[q.param('action')](q, r);
	} else {
		r.send(404);
	}
}

MoveCtrl.prototype.sendChat = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.rollNumber = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.robPlayer = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.finishTurn = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.buyDevCard = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.Year_of_Plenty = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.Road_Building = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.Soldier = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.Monopoly = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.Monument = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.buildRoad = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.buildSettlement = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.buildCity = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.offerTrade = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.acceptTrade = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.maritimeTrade = function(q, r) {
	r.json(sampleJson);
}
MoveCtrl.prototype.discardCards = function(q, r) {
	r.json(sampleJson);
}