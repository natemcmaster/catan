require('./Core.js');
//    DISPLAY ELEMENTS 
require('./view_basics/BasicController.js');
require('./view_basics/BasicDefs.js');
require('./view_basics/BasicDisplayElement.js');
require('./display_elements/AmountChangeDisplayElement.js');
require('./display_elements/ButtonDisplayElement.js');
require('./display_elements/ChooserDisplayElement.js');
require('./display_elements/ComboDisplayElement.js');
require('./display_elements/PointDisplayElement.js');
require('./display_elements/RobDisplayElement.js');
require('./display_elements/TrackerDisplayElement.js');
require('./display_elements/CommDisplayElement.js');
//    MODEL    
require('./model/board/map/hexgrid.js');
require('./model/board/map/hexgrid_impl.js');
require('./model/clientmodel.js');
//    VIEWS AND CONTROLLERS    
// modals 
require('./view_basics/BasicOverlay.js');
require('./trading/AcceptOverlay.js');
require('./view_basics/WaitOverlay.js');
require('./development_cards/CardOverlay.js');
require('./development_cards/BuyOverlay.js');
require('./development_cards/CardController.js');
require('./map/MapOverlay.js');
require('./discard/DiscardOverlay.js');
require('./roll/RollOverlay.js');
require('./roll/RollResultOverlay.js');
require('./discard/DiscardController.js');
require('./points/GameOverOverlay.js');
require('./roll/RollController.js');
// game state views 
require('./turn_tracker/TrackerView.js');
require('./turn_tracker/TrackerController.js');
require('./resources/ResourcesView.js');
require('./resources/ResourcesController.js');
require('./points/PointsView.js');
require('./points/PointsController.js');
// chat, log views	
require('./comms_box/CommView.js');
require('./comms_box/CommController.js');
// trading views
require('./trading/MaritimeView.js');
require('./trading/MaritimeController.js');
require('./trading/DomesticView.js');
require('./trading/DomesticController.js');
// map view
require('./map/RobberOverlay.js');
require('./map/MapView.js');
require('./map/MapController.js');
// Tying it together 
require('./GameplayConnections.js');