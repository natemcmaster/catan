//STUDENT-EDITABLE-BEGIN
/**
	This this contains interfaces used by the map and robber views
	@module catan.map
	@namespace map
	*/

var helpers = require('./mapHelpers');

module.exports = MapController;
var Controller = require('./BaseController');
if (typeof(catan) === 'undefined') catan = {}

var EdgeLoc;
var VertexLoc;
var PortLoc;

var hexgrid = require('byu-catan').models.hexgrid;
var HexLocation = hexgrid.HexLocation;
var VertexLocation = hexgrid.VertexLocation;
var EdgeLocation = hexgrid.EdgeLocation;
var VertexDirection = hexgrid.VertexDirection;
var EdgeDirection = hexgrid.EdgeDirection;   

core.forceClassInherit(MapController,Controller);

core.defineProperty(MapController.prototype,"robView");
core.defineProperty(MapController.prototype,"modalView");

/**
 * @class MapController
 * @constructor
 * @param {MapView} view - The initialized map view
 * @param {MapOverlay} modalView - The overlay to use for placing items on the board.
 * @param {ClientModel} model - The client model
 * @param {RobberOverlay} robView - The robber overlay to be used when the robber is being placed.  This is undefined for the setup round.
 */
function MapController(view, modalView, model, robView){
	EdgeLoc = catan.map.View.EdgeLoc;
	VertexLoc = catan.map.View.VertexLoc;
	PortLoc = catan.map.View.PortLoc;
	Controller.call(this,view,model);
	this.setModalView(modalView);
	this.setRobView(robView);
  
  helpers.drawBase(this.view, this.clientModel.gameboard.map, this.clientModel.getPlayerColors())
  this.state = 'normal'
}

MapController.prototype.onUpdate = function () {
  helpers.draw(this.view, this.clientModel.gameboard.map, this.clientModel.getPlayerColors())
  
  if (this.clientModel.getCurrentStatus() !== 'Robbing') return
  this.startMove('robber', true, false)
};

MapController.prototype.setModalView = function (modalView) {
  this.modalView = modalView;
};

MapController.prototype.setRobView = function (robView) {
  this.robView = robView;
};

/**
	This method is called by the Rob View when a player to rob is selected via a button click.
	@param {Integer} orderID The index (0-3) of the player who is to be robbed
	@method robPlayer
	*/
MapController.prototype.robPlayer = function(orderID){
  this.clientModel.robPlayer(orderID, this.placeState.robHex)
  this.robView.closeModal()
}

/**
 * Starts the robber movement on the map. The map should pop out and the player should be able
 * move the robber.  This is called when the user plays a "solider" development card.
 * @method doSoldierAction
 * @return void
 **/		
MapController.prototype.doSoldierAction = function(){    
  this.startMove('robber', true, false)
}

/**
 * Pops the map out and prompts the player to place two roads.
 * This is called when the user plays a "road building" progress development card.
 * @method startDoubleRoadBuilding
 * @return void
 **/	
MapController.prototype.startDoubleRoadBuilding = function(){
}


/**
 * Pops the map out and prompts the player to place the appropriate piece
 * @param {String} pieceType - "road", "settlement", or "city
 * @param {boolean} free - Set to true in road building and the initial setup
 * @param {boolean} setup - Whether this is in the setup phase (it can be disconnected)
 * @method startMove
 * @return void
 **/	
MapController.prototype.startMove = function (pieceType, free, setup){
  this.placeState = {type: pieceType, free: free, setup: setup}
  this.modalView.showModal(pieceType)
  this.view.startDrop(pieceType, this.clientModel.getClientPlayer().color)
};

/**
 * This method is called from the modal view when the cancel button is pressed. 
 * It should allow the user to continue gameplay without having to place a piece. 
 * @method cancelMove
 * @return void
 * */
MapController.prototype.cancelMove = function(){
  this.modalView.closeModal()
}

function goodLocation(loc, type) {
  switch (type) {
    case 'road':
      return new EdgeLocation(loc.x, loc.y, EdgeDirection[loc.dir])
    case 'robber':
      return new HexLocation(loc.x, loc.y)
    default:
      return new VertexLocation(loc.x, loc.y, VertexDirection[loc.dir])
  }
}

/**
	This method is called whenever the user is trying to place a piece on the map. 
	It is called by the view for each "mouse move" event.  
	The returned value tells the view whether or not to allow the piece to be "dropped" at the current location.

	@param {MapLocation} loc The location being considered for piece placement
	@param {String} type The type of piece the player is trying to place ("robber","road","settlement","city")
	@method onDrag
	@return {boolean} Whether or not the given piece can be placed at the current location.
	*/
MapController.prototype.onDrag = function (loc, type) {
  console.log('drag', loc, type)
  type = type.type
  var fn = 'canPlace' + type[0].toUpperCase() + type.slice(1)
    , loco = goodLocation(loc, type)
  return this.clientModel.gameboard.map[fn](this.clientModel.playerID, loco, this.placeState.setup)
};

/**
	This method is called when the user clicks the mouse to place a piece.
	This method should close the modal and possibly trigger the Rob View.

	@param {MapLocation} loc The location where the piece is being placed
	@param {object} what {type: String, color: String} The type of piece being placed ("robber","road","settlement","city")
	@method onDrop
	*/
MapController.prototype.onDrop = function (loc, what) {
  this.modalView.closeModal()
  var type = what.type
    , loco = goodLocation(loc, type)
  if (type === 'robber') {
    return this.showRobModal(loco)
  }
  var fn = 'place' + type[0].toUpperCase() + type.slice(1)
  this.clientModel.gameboard.map[fn](this.clientModel.playerID, loco, this.placeState.free)
  this.placeState = null
};

/**
 * show rob modal for the given hex
 */
MapController.prototype.showRobModal = function (loco) {
  this.placeState.robHex = loco
  this.robView.setPlayerInfo(this.clientModel.getRobPlayerInfo(loco))
  this.robView.showModal()
}

