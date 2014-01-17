YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "comm.BaseCommController",
        "comm.BaseCommView",
        "comm.ChatController",
        "comm.ChatView",
        "comm.LogController",
        "comm.LogView",
        "core.Core",
        "devCards.BuyCardView",
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
        "models.CatanEdge",
        "models.CatanVertex",
        "models.ClientModel",
        "points.PointController",
        "points.PointView",
        "resources.ResourceBarController",
        "resources.ResourceBarView",
        "roll.RollController",
        "roll.RollResultView",
        "roll.RollView",
        "setup.SetupRoundController",
        "turntracker.TurnTrackerController",
        "turntracker.TurnTrackerView"
    ],
    "modules": [
        "catan.comm",
        "catan.devCards",
        "catan.discard",
        "catan.map",
        "catan.misc",
        "catan.models",
        "catan.models.hexgrid",
        "catan.points",
        "catan.resources",
        "catan.roll",
        "catan.setup",
        "catan.trade",
        "catan.trade.domestic",
        "catan.trade.maritime",
        "catan.turntracker",
        "core"
    ],
    "allModules": [
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