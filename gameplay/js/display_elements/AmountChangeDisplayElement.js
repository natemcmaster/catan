var catan = catan || {};
catan.definitions = catan.definitions || {};

catan.definitions.DisplayElement.AmountChangeElement = (function(){
        var Definitions = catan.definitions;
        var Basics = catan.definitions.DisplayElement.BasicElements;
        
        var AmountChangeElement = (function(){
                
                var AmountChangeElement = function(value, increaseAction, decreaseAction){
						this.setValue(value);
						this.setIncAcn(increaseAction);
						this.setDecAcn(decreaseAction);
						this.setView(this.buildView());
				}
                core.defineProperty(AmountChangeElement.prototype, "IncreaseElem");//
                core.defineProperty(AmountChangeElement.prototype, "DecreaseElem");//
                core.defineProperty(AmountChangeElement.prototype, "LabelElem");//
                core.defineProperty(AmountChangeElement.prototype, "Value");//
                core.defineProperty(AmountChangeElement.prototype, "IncAcn");
                core.defineProperty(AmountChangeElement.prototype, "DecAcn");
                core.defineProperty(AmountChangeElement.prototype, "View");
                                
                AmountChangeElement.prototype.increase = function(){
					this.getIncAcn()();//call the fxn
				}
                AmountChangeElement.prototype.decrease= function(){
					this.getDecAcn()();//call the fxn
				}
                
                AmountChangeElement.prototype.show= function(showUp, showDown, amount){
					this.getIncreaseElem().disabled = !showUp;
					this.getDecreaseElem().disabled = !showDown;
					if(amount == undefined)
						amount = "";
					this.getLabelElem().textContent = amount;
				}
                AmountChangeElement.prototype.hide= function(){
					this.getIncreaseElem().disabled = true;
					this.getDecreaseElem().disabled = true;
					this.getLabelElem().textContent = "";
				}
				AmountChangeElement.prototype.displayAmount= function(amount){
					this.getLabelElem().textContent = amount;
				}
                
                AmountChangeElement.prototype.buildView= function(){
					var div = document.createElement("div");
						div.setAttribute("class","amount-change-box text-center");
					
					var upAction = core.makeAnonymousAction(this, this.increase);
					var upButton = new Basics.InteractiveImage("increase", "amount-change-img", upAction); 
						div.appendChild(upButton);
						this.setIncreaseElem(upButton);
						
					var label = document.createElement("label");
						label.textContent = 0;
						label.setAttribute("class", "short-label");
						div.appendChild(label);
						this.setLabelElem(label);
						
					var downAction = core.makeAnonymousAction(this, this.decrease);
					var downButton = new Basics.InteractiveImage("decrease", "amount-change-img", downAction); 
						div.appendChild(downButton);
						this.setDecreaseElem(downButton);
                    
					 return div;
					}
                
                return AmountChangeElement;
        }());

       return AmountChangeElement;	
}());

