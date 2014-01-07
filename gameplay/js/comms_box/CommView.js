/**
    This is the namespace for the communication classes (log and chat)

    @module catan.comm
    @namespace comm
**/

var catan = catan || {};
catan.comm = catan.comm || {};

catan.comm.View = (function () {
	
	var CommunicationDisplay = catan.definitions.DisplayElement.CommunicationDisplay;
	var NULL_LIST = [];
	var NULL_LENGTH = -1;

	/**
         The superclass for displaying a message history.
		 @class BaseCommView
		 @constructor
		 @params {Object} params an object with information for displaying the view
		 @params {HTMLDivElement} params.parentElem the HTMLDivElement where the view resides
		 @params {String} params.message a message to display when no output has been generated
		 @params {String} params.id the prefix id for the element
		 @params {Boolean} params.haveInput whether the view is display-only or not
	*/
	function CommView(params){
		this.setParentElem(params.parentElem);
		this.setNoDisplayMessage(params.message);
		this.setID(params.id);
		this.setOutputElem(new CommunicationDisplay.OutputElement(params.id+"-output", NULL_LIST, NULL_LENGTH));
		if(params.haveInput)
			this.setInputElem(new CommunicationDisplay.InputElement(params.id+"-input", "Enter Text Here", "Send"));
		else
			this.setInputElem(undefined);
		
		this.buildView();
	};
    
    core.defineProperty(CommView.prototype,"ParentElem");
    core.defineProperty(CommView.prototype,"NoDisplayMessage");
    core.defineProperty(CommView.prototype,"OutputElem");
    core.defineProperty(CommView.prototype,"InputElem");
    core.defineProperty(CommView.prototype,"ID");	
    core.defineProperty(CommView.prototype,"lengthDiff");	
	
    /*
        Adds a "null message" label, output display, and input display if they exist
        @method buildView
    */
	CommView.prototype.buildView = function(){
		var div = this.getParentElem();
		
		var noDisplayLabel = document.createElement("label");
			noDisplayLabel.textContent = this.getNoDisplayMessage();
			div.appendChild(noDisplayLabel);
		
		if(this.getOutputElem()!=undefined)
			div.appendChild(this.getOutputElem().getView());
		if(this.getInputElem()!=undefined)
			div.appendChild(this.getInputElem().getView());
	};
	
	/**
		 Sets new content for the display
		 @method resetLines
		 @param {Array} lines a list of objects with three attributes: source(the player name attached to the event),
		 message(the contents of the line), and className(the color of the object)	 
	*/
	CommView.prototype.resetLines = function(lines){
		var isDifferent = lines.length - this.getOutputElem().getLines().length > 0;
		
		this.getOutputElem().setLines([]);
		for(lineNum in lines){
			this.getOutputElem().addLine(lines[lineNum]);
		}
		if(isDifferent)
			this.getOutputElem().updateScroll();		
	};
	
    /**
        Sets the controller and action for the input element
        @method setController
        @param {Object} controller The controller
    */
	CommView.prototype.setController = function(controller){

		if(this.getInputElem()!=undefined){
			this.getInputElem().setController(controller);
			this.getInputElem().setHitAction();
		}
	};
		
	//return CommView;
	
	var LogView = (function LogView_Class(){
    
		LogView.prototype = core.inherit(CommView.prototype);
		LogView.prototype.constructor = CommView;
        
		/**
		The view class for the Log
		@class LogView
		@constructor
		@extends comm.BaseCommView
		**/
		function LogView(){
			var logPane = document.getElementById("log-pane");
			var params = {
				message: "No game history to display",
				parentElem:logPane,
				id:"log",
			}
			CommView.call(this, params);
		}
		
		return LogView;
	}());
	
	var ChatView = (function ChatView_Class(){
    
		ChatView.prototype = core.inherit(CommView.prototype);
		ChatView.prototype.constructor = CommView;
        
		/**
		The view class for the Chat
		@class ChatView
		@constructor
		@extends comm.BaseCommView
		**/
		function ChatView(){
			var chatPane = document.getElementById("chat-pane");
			var params = {
				message: "No messages have been sent",
				parentElem:chatPane,
				id:"chat",
				haveInput:true
			}
			CommView.call(this, params);
		}
		
		return ChatView;
	}());
	
	return {
		LogView:LogView,
		ChatView:ChatView
	};	
} ());






