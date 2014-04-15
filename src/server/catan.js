/**
 * Module dependencies.
 */
var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  authMiddleware = require('./middleware/auth'),
  gameMiddleware = require('./middleware/game'),
  Injector = require('../common/Injector'),
  path = require('path');

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

module.exports = function(callback, PlClass, deltaNumber, setup) {
  if (arguments.length < 3) {
    throw new Error('Usage: (callback, PlClass, deltaNumber)')
  }

  var app = express();
  var documentRoot = path.join(__dirname, '..', '..', 'build');
  var dataRoot = path.join(documentRoot,'data');
  var commandsToPersist = deltaNumber || 30;

  // all environments
  app.set('port', process.env.PORT || 8081);
  app.set('views', path.join(__dirname, 'views'));
  middleWarez(app)

  // making the game room

  var inj = new Injector();
  // set it up
  setup = setup || require('./config');
  setup(inj)
  inj.singleton('PersistanceLayer', PlClass)

  inj.create('GameRoom', dataRoot, commandsToPersist, function(error, gameRoom) {
    if(error){
      console.log(error);
      callback(null);
      return;
    }
    app.gameRoom = gameRoom;
    app.injector = inj;

    app.use(function(req, res, next) {
      req.gameRoom = gameRoom;
      next();
    });

    app.use(app.router);
    app.use('/', express.static(path.join(documentRoot, 'gameplay')));
    app.use('/docs/', express.static(path.join(documentRoot, 'docs')));

    // controller instantiation
    var controllers = require('./controllers');
    for (var c in controllers) {
      var d = new controllers[c](app, inj);
    }

    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    callback(app);
  });

}
