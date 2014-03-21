/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    authMiddleware = require('./middleware/auth'),
    gameMiddleware = require('./middleware/game')
    Injector = require('../common/Injector')
    ;

var app = express();

var buildRoot = path.join(__dirname,'..','..','build');

// all environments
app.set('port', process.env.PORT || 8081);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(authMiddleware);
app.use(gameMiddleware);
//app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);


app.use('/',express.static(path.resolve(buildRoot, './gameplay')));
app.use('/docs/',express.static(path.resolve(buildRoot, './docs/')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var config = require('./config');
var injector = new Injector();
injector.map(config.runtime);

// making the game room
var gameRoom = injector.create('GameRoom');

app.use(function (req, res, next) {
  req.gameRoom = gameRoom;
  next();
});



// controller instantiation
var controllers = require('./controllers');
for(var c in controllers){
	var d = new controllers[c](app);
}

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});

