var catan = catan || {};
catan.definitions = catan.definitions || {};
/*
Provides the input and output elements for somm display
**/
catan.definitions.DisplayElement.RobElement = ( function(){
	var RobElement = function(){
		this.setView(this.buildView());
	}
	core.defineProperty(RobElement.prototype, "View");
     
     RobElement.prototype.buildView = function(info){
		 var optionDiv = document.createElement("div");
				optionDiv.setAttribute("class","rob-option-box");
			
			if(info != undefined){
				var playerButton = document.createElement("button");
					playerButton.setAttribute("class","rob-option-btn "+info.color);
					playerButton.onclick = info.action;
				
				var nameLabel = document.createElement("label");
					nameLabel.textContent = info.name;
					playerButton.appendChild(nameLabel);
				
				var cardLabel = document.createElement("label");
					cardLabel.textContent = info.cards;
					cardLabel.setAttribute("class","font-medium");
					playerButton.appendChild(cardLabel);
				
				optionDiv.appendChild(playerButton);
			}
			return optionDiv;
	 }
     return RobElement;
}());

