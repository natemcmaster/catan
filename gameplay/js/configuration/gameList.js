// used by the join game page
catan.server.Games = (function(){
    function GameList(){
        reset.call(this);
    }
    
    function reset(){
        this.list = []
        this.names = []
        this.byID = {}
    }
    
    //Private
    function updateFromJSON(games){
        reset.call(this);
        console.log(games);
        for (index in games){
            addGame.call(this,games[index]);
        }
        return this;
    }
    
    function addGame(game){
        this.list.push(game);
        this.names.push(game.title);
        this.byID[game.id] = game;
    }
    
    GameList.prototype.updateFromServer = function updateFromServer(whenDone){
        _this = this;
        $.ajax({
          url: "/games/list",
        }).done(function(data){return whenDone(updateFromJSON.call(_this,data));});
    }
    
    GameList.prototype.updateFromJSON = updateFromJSON
    
    return GameList;
}())
