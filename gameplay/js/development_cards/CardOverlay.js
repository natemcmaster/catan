/**
    This is the namespace for development cards
    @module catan.devCards
    @namespace devCards
*/

var catan = catan || {};
catan.devCards = catan.devCards || {};

catan.devCards.View = (function (){
	
	var BasicOverlay = catan.misc.BasicOverlay;
	var Definitions = catan.definitions;
	var ResourceTypes = catan.definitions.ResourceTypes;
	var DisplayElement = catan.definitions.DisplayElement;
	var SHOW_MOUSEOVER = true;
	var NULL_TEXT = "";
	var NULL_VALUE = "none";
	var MESSAGE_DISPLAY_ID = "dev-card-description";
	var GROUP_NAME = catan.definitions.GroupNames.card;
	var CardTypes = catan.definitions.CardTypes;
	
	var DevCardView = (function(){
		
		/**
		 * A view for viewing and using development cards.  Inherits from misc.BaseOverlay.
		 * @class DevCardView
		 * @extends misc.BaseOverlay
		 * @constructor
		 */
		var DevCardView = function(){
			this.setActions(initActions.call(this));
			this.setDisplayElems({});
			BasicOverlay.call(this, "Development Cards");
		}
		
		DevCardView.prototype = core.inherit(BasicOverlay.prototype);
        
		core.defineProperty(DevCardView.prototype, "DisplayElems");
		core.defineProperty(DevCardView.prototype, "opt1");
		core.defineProperty(DevCardView.prototype, "opt2");
		core.defineProperty(DevCardView.prototype, "btn");
		core.defineProperty(DevCardView.prototype, "actions");
		core.defineProperty(DevCardView.prototype, "display");
		
		/**
		 Attaches the controller to the view and builds the view on the page.
		 @method setController
		 @param {devCards.Controller} controller 
		 @return void
		 */		
		DevCardView.prototype.setController = function(controller){
			this.Controller = controller;
			makeCardsArea.call(this);
			makeExtraFeatureArea.call(this);
			this.setView(this.generateBody());
		}
        
		/**
		 Enables a single card
		 @method setCardEnabled
		 @param {String} card the card to update (from catan.definitions.CardTypes) 
		 @param {Boolean} enabled whether the player can use the card
		 @return void
		 */		
		DevCardView.prototype.setCardEnabled = function(card, enabled){	
			if(enabled)
				this.getDisplayElems()[card].enable(SHOW_MOUSEOVER);
			else
				this.getDisplayElems()[card].disable(SHOW_MOUSEOVER);
		}
        
		/**
		 Sets the amount for a single card
		 @method updateAmount
		 @param {String} value the value to update (from catan.definitions.CardTypes) 
		 @param {int} amount the total number of cards of that type the player has (both old and new cards)
		 @return void
		 */		
		DevCardView.prototype.updateAmount = function(value, amount){	
			this.getDisplayElems()[value].updateLabel(amount);
		}
        
		/**
		 * Resets the overlay view
		 @method clearView
		 @return void
		 */		
		DevCardView.prototype.clearView = function(){	
			this.getOpt1().reset();
			this.getOpt1().hide();
			
			this.getOpt2().reset();
			this.getOpt2().hide();
			
			this.getBtn().hide();
		}
		
		// private methods
        
		DevCardView.prototype.generateBody = function(){		
			
			makeExtraFeatureArea.call(this);
				
			var div = document.createElement("div");
            div.setAttribute("class", "center-content");
			
			var displayDiv = document.createElement("div");
            displayDiv.setAttribute('class',"card-display-area");
            
            if(this.getController() != undefined){
                for(index in CardTypes){
                    displayDiv.appendChild(this.getDisplayElems()[CardTypes[index]].getView());
                }	
            }
            div.appendChild(displayDiv);
			
			var chooserArea = document.createElement("div");
            chooserArea.appendChild(this.getBtn().getView());
            chooserArea.appendChild(this.getOpt1().getView());
            chooserArea.appendChild(this.getOpt2().getView());
            chooserArea.appendChild(this.getBtn().getView());
            div.appendChild(chooserArea);
			
			var messageElem = document.createElement("label");
            messageElem.setAttribute("id",MESSAGE_DISPLAY_ID);
            messageElem.textContent = NULL_TEXT;
            div.appendChild(messageElem);
				
			return div;
		}
        
		DevCardView.prototype.generateFooter = function(){		
			
			var div = document.createElement("div");
            div.setAttribute("class", "center-content");
			
			var cancelAction = core.makeAnonymousAction(this, this.closeModal);
			var cancelButton = new DisplayElement.ButtonArea(cancelAction);
            cancelButton.setMessage("Cancel");
            div.appendChild(cancelButton.getView());
			
			return div;
		}
		
		var makeCardsArea = function(){
			for(index in CardTypes){
				var cardType = CardTypes[index];
				var action = this.getActions()[cardType];
						
				var displayElem = new DisplayElement.ComboElement(GROUP_NAME, cardType, action);
                displayElem.setMouseIn(getMouseInAction.call(this,cardType));
                displayElem.setMouseOut(getMouseOutAction.call(this));
                
                this.getDisplayElems()[cardType] = displayElem;
                displayElem.enable(SHOW_MOUSEOVER);
			}	
		}
		
		var makeExtraFeatureArea = function(){
			var btn = new DisplayElement.ButtonArea();
            this.setBtn(btn);
            btn.hide();
				
			var o1 = new DisplayElement.ChooserElement("option1", makeChooserOptions.call(this))
            this.setOpt1(o1);
            o1.hide()
			
			var o2 = new DisplayElement.ChooserElement("option2", makeChooserOptions.call(this))
            this.setOpt2(o2);
            o2.hide();
		}
		
		// displays the options for the card
        
		DevCardView.prototype.showYop = function(){
            this.getOpt1().reset();
            this.getOpt1().show();
            
            this.getOpt2().reset();
            this.getOpt2().show();
            
            this.getBtn().updateAction(core.makeAnonymousAction(this, this.doYop));
            this.getBtn().setMessage("use year of plenty");
            this.getBtn().show();
		}
		
		DevCardView.prototype.showMon = function(){
			this.getOpt1().reset();
			this.getOpt1().show();
			
			this.getOpt2().reset();
			this.getOpt2().hide();
			
			this.getBtn().updateAction(core.makeAnonymousAction(this, this.doMon));
			this.getBtn().show();
			this.getBtn().setMessage("use monopoly");
		}
		
		// called on pressing the "use" button
        
		DevCardView.prototype.doYop = function(){
			
			var o1 = this.getOpt1().getSelected();
			var o2 = this.getOpt2().getSelected();
	
			if(o1 != NULL_VALUE && o2 != NULL_VALUE)
				this.getController().useYearOfPlenty(o1, o2);
		}
        
		DevCardView.prototype.doMon = function(){
			
			var o1 = this.getOpt1().getSelected();
			if(o1 != NULL_VALUE)
				this.getController().useMonopoly(o1);
		}
	
		// for building the views
        
		var makeChooserOptions = function(){
			var options = new Array();
			
			options.push({	label:NULL_VALUE});
			
			for(index in ResourceTypes){
				options.push({	label:ResourceTypes[index]	});
			}
			return options;
		}
		
		var initActions = function(){
			var actions = {};
				
            actions[Definitions.SOLDIER] = core.makeAnonymousAction(this, this.useSoldier);
            actions[Definitions.YEAR_OF_PLENTY] = core.makeAnonymousAction(this, this.showYop);
            actions[Definitions.MONOPOLY] = core.makeAnonymousAction(this, this.showMon);
            actions[Definitions.ROAD_BUILD] = core.makeAnonymousAction(this, this.useRoadBuild);
            actions[Definitions.MONUMENT] = core.makeAnonymousAction(this, this.useMonument);
            
			return actions;
		}
		
		DevCardView.prototype.useRoadBuild = function(){
			this.getController().useRoadBuild();
		}
        
		DevCardView.prototype.useMonument = function(){
			console.log("using road!");
			this.getController().useMonument()
		}
        
		DevCardView.prototype.useSoldier = function(){
			this.getController().useSoldier();
		}
		
		var getMessage = function(card){
			return Definitions.CardInfo[card];
		};
        
		var getMouseInAction = function(value) {
			var msg = getMessage.call(this, value);
			return function(){
				var display = document.getElementById(MESSAGE_DISPLAY_ID);
				if(display!=null)
					display.textContent = msg;
			}
		};
        
		var getMouseOutAction = function() {
			return function(){
				var display = document.getElementById(MESSAGE_DISPLAY_ID);
				if(display!=null)
					display.textContent = NULL_TEXT;
			}
		};
		
		return DevCardView;
	}());
	
	return DevCardView;
}());

