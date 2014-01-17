/**
    This is the namespace for development cards
    @module catan.devCards
    @namespace devCards
*/

var catan = catan || {};
catan.devCards = catan.devCards || {};

catan.devCards.BuyView = (function cards_namespace(){
        
    var BasicOverlay = catan.misc.BasicOverlay;
    var Definitions = catan.definitions;
    var StaticImage = catan.definitions.DisplayElement.BasicElements.StaticImage;

    /**
     * A view for buying a development card.  Inherits from misc.BaseOverlay.
     * @class BuyCardView
     * @constructor
     * @extends misc.BaseOverlay
     */
    var BuyCardView = (function BuyCardView_Class(){
        
        var BuyCardView = function (){
            BasicOverlay.call(this, "Buy Development Cards");
        };
        
        BuyCardView.prototype = core.inherit(BasicOverlay.prototype);
        
        BuyCardView.prototype.generateBody = function(){
            var divContainer = document.createElement("div");
                divContainer.setAttribute("class","text-center");
            
            var msg = document.createElement("label");
                msg.setAttribute("class","overlay-label");
                msg.innerHTML= "Really buy a development card?"
            divContainer.appendChild(msg);
            
            var img = new StaticImage("BuyCard", "overlay-image");
            divContainer.appendChild(img);
              
            return divContainer;
        };
        
        BuyCardView.prototype.generateFooter = function(){
            var divContainer = document.createElement("div");
            divContainer.setAttribute("class","text-center");
            var buyButton = document.createElement("button");
            buyButton.setAttribute("class","button-area half short");
            buyButton.innerHTML = "Buy Card";
            buyButton.onclick = core.makeAnonymousAction(this, 
                                                            function(){
                                                                this.getController().buyCard(); 
                                                                this.closeModal()
                                                            }
                                                        );
			divContainer.appendChild(buyButton);
			
            var cancelButton = document.createElement("button");
            cancelButton.setAttribute("class","button-area half short");
            cancelButton.innerHTML = "No thanks!";
            cancelButton.onclick = core.makeAnonymousAction(this, this.closeModal);
            divContainer.appendChild(cancelButton);
			
			return divContainer;
        };
        
        return BuyCardView;
	}());
        
    return BuyCardView;
}());

