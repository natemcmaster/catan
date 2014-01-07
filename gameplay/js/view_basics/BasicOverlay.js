/**
    This is the namespace to hold the base classes
    @module catan.misc
    @namespace misc
*/

var catan = catan || {};
catan.misc = catan.misc || {};

catan.misc.BasicOverlay = (function(){
	
    /**
     * This class is the base class for all overlay view classes.
     * @class BaseOverlay
     * @constructor
     */
	var Overlay = (function(){
    
		var Overlay = function(title,id){
			this.setTitle(title);
			this.setParentElement(document.body);
			this.setBodyId("modal-body");
			this.setId(id || "modal-overlay");
			this.setFlag(false);
			this.setView(this.generateBody());
		}
		
		core.defineProperty(Overlay.prototype, "Title");
		core.defineProperty(Overlay.prototype, "Id");
		core.defineProperty(Overlay.prototype, "BodyId");
		core.defineProperty(Overlay.prototype, "TriggerElem");
		core.defineProperty(Overlay.prototype, "ModalBodyElement");
		core.defineProperty(Overlay.prototype, "ModalElement");
		core.defineProperty(Overlay.prototype, "Header");
		core.defineProperty(Overlay.prototype, "Footer");
		core.defineProperty(Overlay.prototype, "ParentElement");
		core.defineProperty(Overlay.prototype, "Controller");
		core.defineProperty(Overlay.prototype, "Flag");
		core.defineProperty(Overlay.prototype, "View");
	
        /**
		 * sets the Controller for the view
		 * @method setController
		 * @param {misc.BaseController} controller
		 * @return void
		 */
		Overlay.prototype.setController = function(controller){
			this.Controller = controller;
			this.setView(this.generateBody());
		};
	
		//Abstract function - this MUST be overridden to return a dom object
		Overlay.prototype.generateBody = function(){console.log("modal generateBody(): not yet implemented");}
		
		/**
		 * makes the overlay visible
		 * @method showModal
		 * @return void
		 */
		Overlay.prototype.showModal = function(){
			if(!this.getFlag()){
					this.constructModalElements();
					this.getParentElement().appendChild(this.getModalElement());
					
					var body = this.getModalBodyElement();
					
					var subBody = this.getView();
					
					body.appendChild(subBody);
					this.bringUpDisplay();
					this.TooltipFunction();
					this.setFlag(true);
				}
		}
		
		Overlay.prototype.generateHeader = function(){
			var divHeader = document.createElement("div");
				divHeader.setAttribute('class',"modal-header");
				divHeader.id = this.getId()+"-header";
			var hTitle = document.createElement("h3");
				hTitle.textContent = this.getTitle()||"Basic Overlay";
			divHeader.appendChild(hTitle);
			return divHeader;
		}
		
		// This defaults to generate nothing. 
		Overlay.prototype.generateFooter = function(){
			
		}
		
		function generateTop(){
			var divTop = document.createElement("div");
				divTop.setAttribute('class',"modal hide");
				divTop.setAttribute('style',"display: none;");
				divTop.setAttribute('data-backdrop',"static");//makes it not exit modal if you click outside the box.
				divTop.setAttribute('id',this.getId());
			return divTop;
		}
		
		function makeTrigger(){		
			var aTrigger = document.createElement("a");
			aTrigger.setAttribute('class',"btn");
			aTrigger.setAttribute('data-toggle',"modal");
			aTrigger.setAttribute('href',"#"+this.getId());
			aTrigger.setAttribute('style',"visibility:hidden;");

			this.setTriggerElem(aTrigger);
			
			return aTrigger;
		}
		
		Overlay.prototype.constructModalElements = function(){
			var divTop = generateTop.call(this);
			var divHeader = this.generateHeader();
			var divBody = document.createElement("div");
				divBody.setAttribute('class',this.getBodyId());
				divBody.setAttribute('id',this.getBodyId());
				divBody.setAttribute('style',"height: 290px;");
			var divFooter = this.generateFooter();
			this.setHeader(divHeader);
			this.setModalBodyElement(divBody);
			this.setFooter(divFooter);
			
			if (divHeader) divTop.appendChild(divHeader);
			divTop.appendChild(divBody);
			if (divFooter) divTop.appendChild(divFooter);

			var aTrigger = makeTrigger.call(this);
			divTop.appendChild(aTrigger);
			this.setModalElement(divTop);		
		}
		
		Overlay.prototype.TooltipFunction = function(){};
		
		Overlay.prototype.bringUpDisplay = function(){
			$('#'+this.getId()).modal('show');
		}
        
		/**
		 * makes the overlay invisible
		 * @method closeModal
		 * @return void
		 */
		Overlay.prototype.closeModal = function(){
			if(this.getFlag()){
				$("#"+this.getId()).modal('hide');
				$("#"+this.getId()).remove();
			}
			this.setFlag(false);
		}
	
		return Overlay;
	}());
	
	Overlay.ShowDialog = (function(){
		var defaultInfo = {
			ok:{text:"ok",onclick:function(){}},
			cancel:{text:"cancel",onclick:function(){}},
			body:document.createElement("div"),
			title:"Standard Dialog",
			id:"standard-dialog",
			header:document.createElement("div"),
		}
		
		core.forceClassInherit(StandardDialog,Overlay);
        
		function StandardDialog(info){
			this.info = $.extend(defaultInfo,info);				
			Overlay.call(this,this.info.title,this.info.id);
		}
		
		StandardDialog.prototype.generateHeader = function(){
			if(this.info.title == "Standard Dialog"){
				this.info.header.setAttribute('class',"modal-header");
				return this.info.header;
			}else 
				Overlay.prototype.generateHeader(this);
		}
		
		StandardDialog.prototype.generateBody = function(){
			return this.info.body;
		}

		StandardDialog.prototype.generateFooter = function(){
			var footer = document.createElement("div");
				footer.setAttribute('class','modal-footer');

			var primary = true;
			if (this.info.ok){
				footer.appendChild(this.makeReject(primary));
				primary = false;
			}
			if (this.info.cancel){
				footer.appendChild(this.makeAccept(primary));
				primary = false;
			}
			if (!primary) return footer;
		}
		
		StandardDialog.prototype.makeCloser = function(button){
			button.setAttribute("data-dismiss","modal");
			var doAction = button.onclick;
			var close = core.makeAnonymousAction(this,this.closeModal,[]);
			button.onclick = function(){doAction();close()};
			return button;
		}
		
		StandardDialog.prototype.makeReject = function(primary){
			return this.makeCloser(makeButton(this.info.cancel,primary));
		}
		StandardDialog.prototype.makeAccept = function(primary){
			return this.makeCloser(makeButton(this.info.ok,primary));
		}
		
		function makeButton(buttonArgs, primary){
			var button = document.createElement('a');
			button.setAttribute('href','#');
			var classes = 'btn';
			if (primary) classes = classes + " primary";
			button.setAttribute('class',classes);
			button.textContent = buttonArgs.text;
			button.onclick = buttonArgs.onclick;
			return button;
		}
				
		return StandardDialog;	
	}());

	return Overlay;
}());

