module.exports = function() {
	return new GameSetup();
};

var ClientModel = require('./model/').ClientModel;
var Controllers = require('./controllers/');
var gameTypeModules = {
	setup: ['turnTracker', 'map', 'resources', 'vp', 'log', 'setup'],
	catan: ['turnTracker', 'map', 'roll', 'domTrade', 'marTrade', 'devCard', 'resources', 'vp', 'log', 'chat', 'discard']
};

function GameSetup() {}

GameSetup.prototype.run = function run(gameType) {
	var playerID = JSON.parse(decodeURIComponent(Cookies.get("catan.user"))).playerID;
	this.clientModel = new ClientModel(playerID);
	this.gameType = gameType;
	this.clientModel.initFromServer(this.bootstrap.bind(this));
}

GameSetup.prototype.bootstrap = function() {
	this.views = {};
	this.controllers = {};

	for (var f in gameTypeModules[this.gameType]) {
		var name = gameTypeModules[this.gameType][f];
		var mod = modules[name].apply(this, this.clientModel);
		this.views[name] = mod[1];
		this.controllers[name] = mod[2];
	}

	for (var name in controllers) {
		// Add your Observer here
	}
};

var modules = {
	turnTracker: function(model) {
		var view = new catan.turntracker.View();
		var controller = Controllers.TrackerController(view, model);
		view.setController(controller);
		return [view, controller];
	},
	map: function(model) {
		var MAP_RADIUS = 4;
		var height = $(window).height(); // returns height of browser viewport
		var width = $(window).width(); // returns width of browser viewport
		var view = new catan.map.View.MapView(height - 200, MAP_RADIUS * 2 - 1, MAP_RADIUS * 2 - 1);
		var robberView = (this.gameType == 'setup') ? robberView = new catan.views.overlays.RobOverlay() : null;

		var overlayView = new catan.views.overlays.MapOverlay();
		overlayView.setCancelAllowed(this.gameType == 'catan');

		var controller = Controllers.MapController(view, overlayView, model, robberView);
		view.setController(controller);
		overlayView.setController(controller);
		if (robberView)
			robberView.setController(controller);

		return [view, controller];
	},
	resources: function(model) {
		var view = new catan.resources.View();
		var map = this.controllers.map;
		var buildMoves = (this.gameType == 'setup') ? null : {
			"Roads": core.makeAnonymousAction(map, map.startMove, ["Road", false]),
			"Cities": core.makeAnonymousAction(map, map.startMove, ["City", false]),
			"Settlements": core.makeAnonymousAction(map, map.startMove, ["Settlement", false]),
			"DevCards": core.makeAnonymousAction(views.useDevCard, views.useDevCard.showModal, [true]),
			"BuyCard": core.makeAnonymousAction(views.buyDevCard, views.buyDevCard.showModal, [true])
		};
		var controller = Controllers.ResourcesController(view, model, buildMoves);
		view.setController(controller);
		return [view, controller];
	},
	vp: function(model) {
		var view = new catan.points.View();
		var endGame = this.gameType == 'catan' ? new catan.misc.GameFinishedView() : null;
		var controller = Controllers.PointController(view, endGame, model);
		return [view, controller];
	},
	log: function(model) {
		var view = new catan.comm.View.Log();
		var controller = Controllers.CommController.LogController(view, clientModel);
		return [view, controller];
	},
	setup: function(model) {
		var controller = Controllers.SetupRoundController(clientModel, controllers.map);
		return [null, controller];
	},
	roll: function(model) {
		var view = new catan.roll.View();
		var resultView = new catan.roll.ResultOverlay();
		var controller = new Controllers.RollController(view, resultView, model);

		view.setController(controller);
		resultView.setController(controller);
		return [view, controller];
	},
	domTrade: function(model) {
		var domView = new catan.trade.domestic.View();
		var waitingView = new catan.misc.WaitOverlay("Waiting for the Trade to Go Through");
		var acceptView = new catan.trade.domestic.AcceptView();
		var domController = new Controllers.DomesticController(domView, waitingView, acceptView, model);

		domView.setController(domController);
		acceptView.setController(domController);

		return [domView, domController];
	},
	marTrade: function(model) {
		var marView = new catan.trade.maritime.View();
		var marController = new Controllers.MaritimeController(marView, model);
		marView.setController(marController);
		return [marView, marController];
	},
	devCards: function(model) {
		var useDevCard = new catan.devCards.View();
		var buyDevCard = new catan.devCards.BuyView();

		var sAction = function(_this) {
			this.controllers.map.doSoldierAction();
		}.bind(this);
		var rAction = function(_this) {
			this.controllers.map.startDoubleRoadBuilding();
		}.bind(this);

		var controller = new Controllers.CardController(useDevCard, buyDevCard, model, sAction, rAction);
		buyDevCard.setController(controller);
		useDevCard.setController(controller);
		this.views.buyDevCard = buyDevCard;
		this.views.useDevCard = useDevCard;
		return [null, controller];
	},
	chat: function(model) {
		var chatView = new catan.comm.View.ChatView();
		var chatController = new Controllers.CommController.ChatController(chatView, model);
		chatView.setController(chatController);
		return [chatView, chatController]
	},
	discard: function(model) {
		var discardView = new catan.discard.View();
		var waitingView = new catan.misc.WaitOverlay("Waiting for other Players to Discard");

		var discardController = new Controllers.DiscardController(discardView, waitingView, clientModel);
		discardView.setController(discardController);
		return [discardView, discardController];
	}
};