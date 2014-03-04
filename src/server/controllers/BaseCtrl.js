'use strict';

module.exports = BaseCtrl;

function BaseCtrl(app, model) {
	this.model = model;
	this.assignRoutes(app);
}

BaseCtrl.prototype.assignRoutes = function(app) {

}