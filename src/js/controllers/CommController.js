//STUDENT-EDITABLE-BEGIN
/**
    This is the namespace for the communication classes (log and chat)
    @module catan.comm
    @namespace comm
**/
	
module.exports = {
	LogController:LogController,
	ChatController:ChatController
};

var window = window || {};
var catan = window.catan || {};
catan.controllers = catan.controllers || {};

var Controller = require('./BaseController');

/**
	The basic controller class to extend from
	@class BaseCommController 
	@extends misc.BaseController
	@param {comm.BaseCommView} logView The view for this object to control.
	@param {models.ClientModel} model The view for this object to control.
	@constructor
 **/
BaseCommController.prototype = core.inherit(Controller.prototype);
BaseCommController.prototype.contructor = BaseCommController;

function BaseCommController(logView, model){
	Controller.call(this,logView,model);
}


LogController.prototype = core.inherit(BaseCommController.prototype);
LogController.prototype.constructor = LogController;

/**
	The controller class for the Log
	@class LogController 
	@constructor
	@extends comm.BaseCommController
	@param {comm.LogView} logView The view for this object to control.
	@param {models.ClientModel} model The view for this object to control.
 **/
function LogController(logView, model){
	BaseCommController.call(this,logView,model);
	this.onUpdate();
}

// update the log lines
LogController.prototype.onUpdate = function () {
	
	var clientPlayer = this.clientModel.getClientPlayer();
	var lines = this.clientModel.log.entries;

	for(var i = 0; i < lines.length; i++){
		lines[i].className = this.clientModel.getPlayerByName(lines[i].source).color;
	}

	this.view.resetLines(lines)
}


ChatController.prototype = core.inherit(BaseCommController.prototype);
ChatController.prototype.constructor = ChatController;

/**
	The controller class for the Chat
	@class ChatController 
	@constructor
	@extends comm.BaseCommController
	@param {comm.ChatView} logView The view for this object to control.
	@param {comm.ClientModel} model The view for this object to control.
 **/
function ChatController(chatView,model){
	BaseCommController.call(this,chatView,model);
	this.onUpdate();
}

// update the chat lines
ChatController.prototype.onUpdate = function () {
	var clientPlayer = this.clientModel.getClientPlayer();
	var lines = this.clientModel.chat.chat;

	for(var i = 0; i < lines.length; i++){
		lines[i].className = this.clientModel.getPlayerByName(lines[i].source).color;
	}

	this.view.resetLines(lines)
}


/**
	Called by the view whenever input is submitted
	@method addLine
	@param {String} lineContents The contents of the submitted string
 **/
ChatController.prototype.addLine = function(lineContents){
	var clientPlayer = this.clientModel.getClientPlayer();

	this.clientModel.chat.sendChat(clientPlayer.playerIndex, lineContents)
};

