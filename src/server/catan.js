/**
 * Module dependencies.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    authMiddleware = require('./middleware/auth'),
    gameMiddleware = require('./middleware/game'),
    Injector = require('../common/Injector')
    ;

function middleWarez(app) {
  app.use(express.favicon());
  // app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(authMiddleware);
  app.use(gameMiddleware);
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(bodyParser());
}

module.exports = function (callback, setup) {
  /// var inj = new Injector();
  /// setup(inj);

  var app = express();
  var documentRoot = path.join(__dirname,'..','..','build');

  // all environments
  app.set('port', process.env.PORT || 8081);
  app.set('views', path.join(__dirname, 'views'));
  middleWarez(app)

  // making the game room
  
  var inj = new Injector();
  // set it up
  setup = setup || require('./config');
  setup(inj)
  try {
    var PlClass = require(process.argv[1]);
    var deltaNumber = parseInt(process.argv[2], 10);
  } catch (e) {
    console.error('Usage: node app.js path/to/pl-plugin.js deltaNumber')
    process.exit(2)
  }
  inj.register('PersistanceLayer', PlClass)
  var dao = inj.create('DAO', deltaNumber);

  dao.createGameRoom(function (gameRoom) {
    app.gameRoom = gameRoom;
    app.injector = inj;

    app.use(function (req, res, next) {
      req.gameRoom = gameRoom;
      next();
    });

    app.use(app.router);
    app.use('/',express.static(path.join(documentRoot, 'gameplay')));
    app.use('/docs/',express.static(path.join(documentRoot, 'docs')));

    // controller instantiation
    var controllers = require('./controllers');
    for(var c in controllers){
      var d = new controllers[c](app, inj);
    }

    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    callback(app);

  })
}

