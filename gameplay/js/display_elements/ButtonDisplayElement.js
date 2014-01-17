/*
Provides the input and output elements for comm display
*/

var catan = catan || {};
catan.definitions = catan.definitions || {};
catan.definitions.DisplayElement = catan.definitions.DisplayElement || {};

catan.definitions.DisplayElement.ButtonArea = (function(){

	var ButtonArea = function(action1, action2, double){
		this.setAction(action1);
		this.setAction2(action2);
		if(action2 != undefined)
			this.setView(this.buildDoubleView());
		else
			this.setView(this.buildView());
	}
	core.defineProperty(ButtonArea.prototype, "button");
	core.defineProperty(ButtonArea.prototype, "button2");
	core.defineProperty(ButtonArea.prototype, "action");
	core.defineProperty(ButtonArea.prototype, "action2");
	core.defineProperty(ButtonArea.prototype, "view");
				
	ButtonArea.prototype.buildView = function(message){
		var div = document.createElement("div");
			div.setAttribute("class","text-center button-box");
                        
		var button = document.createElement("button");
			button.setAttribute("class","button-area half short");
							
		if(message!=undefined)
			button.textContent = message;
							
		button.onclick = this.getAction();
		
		div.appendChild(button);
		
		this.setButton(button);
		
                
		return div;
	}
	
	ButtonArea.prototype.buildDoubleView = function(){
		var div = document.createElement("div");
			div.setAttribute("class","text-center button-box");
                        
		var button = document.createElement("button");
			button.setAttribute("class","button-area half short");
			
		var button2 = document.createElement("button");
			button2.setAttribute("class","button-area half short");
						
							
		button.onclick = this.getAction();
		button2.onclick = this.getAction2();
		div.appendChild(button);
		div.appendChild(button2);
		this.setButton(button);
		this.setButton2(button2);
                
		return div;
	}
	
	ButtonArea.prototype.setMessage= function(message, message2){
		if(message != undefined && this.getButton() != undefined)
			this.getButton().textContent = message;
		if(message2 != undefined && this.getButton2() != undefined)
			this.getButton2().textContent = message2;
	}
	ButtonArea.prototype.updateAction= function(action){
		this.setAction(action);
		this.getButton().onclick = action;
	}
	ButtonArea.prototype.setStyle= function(style){
		if(this.getButton()!= undefined)
			this.getButton().setAttribute("class",style);
	}
	ButtonArea.prototype.disable= function(){
		this.getButton().disabled = true;
	}
	ButtonArea.prototype.enable= function(){
		this.getButton().disabled = false;
	}
	ButtonArea.prototype.hide= function(){
		this.getButton().setAttribute("style","visibility:hidden;");
	}
	ButtonArea.prototype.show= function(){
		this.getButton().setAttribute("style","visibility:visible;");
	}			
	return ButtonArea;
} ());

