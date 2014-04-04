YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "board.Bank",
        "board.Player",
        "catan.DAO",
        "comm.BaseCommController",
        "comm.BaseCommView",
        "comm.ChatView",
        "comm.LogView",
        "core.Core",
        "devCards.BuyCardView",
        "devCards.ChatController",
        "devCards.DevCardController",
        "devCards.DevCardView",
        "discard.DiscardController",
        "discard.DiscardView",
        "domestic.AcceptView",
        "domestic.DomesticController",
        "domestic.DomesticView",
        "hexgrid.BaseContainer",
        "hexgrid.BaseLocation",
        "hexgrid.BasicHex",
        "hexgrid.EdgeDirection",
        "hexgrid.EdgeLocation",
        "hexgrid.HexDirection",
        "hexgrid.HexGrid",
        "hexgrid.HexLocation",
        "hexgrid.VertexDirection",
        "hexgrid.VertexLocation",
        "map.EdgeLoc",
        "map.MapController",
        "map.MapOverlay",
        "map.MapView",
        "map.Point",
        "map.PortLoc",
        "map.RobberOverlay",
        "map.VertexLoc",
        "maritime.MaritimeController",
        "maritime.MaritimeView",
        "misc.BaseController",
        "misc.BaseOverlay",
        "misc.GameFinishedView",
        "misc.WaitOverlay",
        "model.AcceptTradeCommand",
        "model.BuildCityCommand",
        "model.BuildRoadCommand",
        "model.BuildSettlementCommand",
        "model.BuyDevCardCommand",
        "model.Chat",
        "model.Deck",
        "model.DiscardCardsCommand",
        "model.Edge",
        "model.FinishTurnCommand",
        "model.GameBoard",
        "model.GameModel",
        "model.Hex",
        "model.Injector",
        "model.Injector.Dependency",
        "model.InjectorError",
        "model.Log",
        "model.Map",
        "model.MaritimeTradeCommand",
        "model.NumberTiles",
        "model.OfferTradeCommand",
        "model.PlayMonopolyCommand",
        "model.PlayMonumentCommand",
        "model.PlayRoadBuildingCommand",
        "model.PlaySoldierCommand",
        "model.PlayYearOfPlentyCommand",
        "model.Port",
        "model.Proxy",
        "model.RobPlayerCommand",
        "model.RollDiceCommand",
        "model.SendChatCommand",
        "model.TurnTracker",
        "model.Vertex",
        "models.ClientModel",
        "persistance.BasePL",
        "persistance.FilePL",
        "persistance.MemoryPL",
        "persistance.SqlitePL",
        "points.PointController",
        "points.PointView",
        "resources.ResourceBarController",
        "resources.ResourceBarView",
        "roll.RollController",
        "roll.RollResultView",
        "roll.RollView",
        "servermodel.GameRoom",
        "servermodel.Log",
        "servermodel.Messager",
        "servermodel.User",
        "setup.SetupRoundController",
        "setup.StatefulController",
        "turntracker.TurnTrackerController",
        "turntracker.TurnTrackerView"
    ],
    "modules": [
        "catan",
        "catan.comm",
        "catan.devCards",
        "catan.discard",
        "catan.map",
        "catan.misc",
        "catan.model",
        "catan.model.board",
        "catan.model.board.map",
        "catan.model.commands",
        "catan.models",
        "catan.models.hexgrid",
        "catan.persistance",
        "catan.points",
        "catan.resources",
        "catan.roll",
        "catan.server.model",
        "catan.setup",
        "catan.trade",
        "catan.trade.domestic",
        "catan.trade.maritime",
        "catan.turntracker",
        "core"
    ],
    "allModules": [
        {
            "displayName": "catan",
            "name": "catan"
        },
        {
            "displayName": "catan.comm",
            "name": "catan.comm",
            "description": "This is the namespace for the communication classes (log and chat)"
        },
        {
            "displayName": "catan.devCards",
            "name": "catan.devCards",
            "description": "This is the namespace for development cards"
        },
        {
            "displayName": "catan.discard",
            "name": "catan.discard",
            "description": "This is the namespace for discarding cards"
        },
        {
            "displayName": "catan.map",
            "name": "catan.map",
            "description": "This this contains interfaces used by the map and robber views"
        },
        {
            "displayName": "catan.misc",
            "name": "catan.misc",
            "description": "This is the namespace to hold the base classes"
        },
        {
            "displayName": "catan.model",
            "name": "catan.model"
        },
        {
            "displayName": "catan.model.board",
            "name": "catan.model.board"
        },
        {
            "displayName": "catan.model.board.map",
            "name": "catan.model.board.map",
            "description": "This module containts functionality for the map"
        },
        {
            "displayName": "catan.model.commands",
            "name": "catan.model.commands"
        },
        {
            "displayName": "catan.models",
            "name": "catan.models",
            "description": "This module contains the top-level client model class"
        },
        {
            "displayName": "catan.models.hexgrid",
            "name": "catan.models.hexgrid",
            "description": "This is the namespace for what abstracts the hex grid interface:\n\tlocations, the hex grid, directions and a basic hex class"
        },
        {
            "displayName": "catan.persistance",
            "name": "catan.persistance"
        },
        {
            "displayName": "catan.points",
            "name": "catan.points",
            "description": "This is the namespace for point display"
        },
        {
            "displayName": "catan.resources",
            "name": "catan.resources",
            "description": "This is the namespace for resources"
        },
        {
            "displayName": "catan.roll",
            "name": "catan.roll",
            "description": "This is the namespace the rolling interface"
        },
        {
            "displayName": "catan.server.model",
            "name": "catan.server.model"
        },
        {
            "displayName": "catan.setup",
            "name": "catan.setup",
            "description": "This is the namespace for the intitial game round"
        },
        {
            "displayName": "catan.trade",
            "name": "catan.trade"
        },
        {
            "displayName": "catan.trade.domestic",
            "name": "catan.trade.domestic",
            "description": "This is the namespace for domestic trading"
        },
        {
            "displayName": "catan.trade.maritime",
            "name": "catan.trade.maritime",
            "description": "This is the namespace for maritime trading"
        },
        {
            "displayName": "catan.turntracker",
            "name": "catan.turntracker",
            "description": "The namespace for the turn tracker"
        },
        {
            "displayName": "core",
            "name": "core",
            "description": "These functions are in the default namespace and provide core functionality such as inheritance."
        }
    ]
} };
});