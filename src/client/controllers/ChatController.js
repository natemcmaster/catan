module.exports = ChatController;

var BaseCommController = require('./BaseCommController');
/**
	The controller class for the Chat
	@class ChatController 
	@constructor
	@extends comm.BaseCommController
	@param {comm.ChatView} logView The view for this object to control.
	@param {comm.ClientModel} model The view for this object to control.
 **/
function ChatController(chatView, model) {
	BaseCommController.call(this, chatView, model);
	ChatController.prototype.commType = 'chat';
	this.onUpdate();
}
ChatController.prototype = core.inherit(BaseCommController.prototype);
ChatController.prototype.constructor = ChatController;


/**
	Called by the view whenever input is submitted
	@method addLine
	@param {String} lineContents The contents of the submitted string
 **/
ChatController.prototype.addLine = function(lineContents) {
	var clientPlayer = this.clientModel.getClientPlayer();

	this.clientModel.chat.sendChat(clientPlayer.playerIndex, lineContents);
};