'use strict';

module.exports = GameCtrl;

var fs = require('fs');
var path = require('path');

var BaseCtrl = require('./BaseCtrl');

function GameCtrl(app, model) {
	BaseCtrl.call(this, app, model);
}
GameCtrl.prototype = Object.create(BaseCtrl);
GameCtrl.constructor = GameCtrl;

GameCtrl.prototype.getters = {
  '/game/model': function (req, res) {
    res.json(req.gameRoom.getGameByID(req.gameID).toJSON());
  },
  '/game/commands': function (req, res) {
    res.end(500, 'Not implemented');
  },
  '/game/listAI': function (req, res) {
    res.end(500, 'Not implemented');
  }
}

GameCtrl.prototype.commands = {
  '/game/reset': ResetGameCommand,
  '/game/commands': function () {
    return new Error('Not implemented');
  },
  '/game/addAI': function () {
    return new Error('Not implemented');
  }
}

