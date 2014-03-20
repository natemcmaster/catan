'use strict';

module.exports = BaseCtrl;

function BaseCtrl(app) {
	this.assignRoutes(app);
}

BaseCtrl.prototype.commands = {};
BaseCtrl.prototype.getters = {};

BaseCtrl.prototype.assignRoutes = function(app) {
  for (var path in this.getters) {
    app.get(path, this.getters[path].bind(this));
  }
  for (var path in this.commands) {
    app.post(path, this.commandRoute.bind(this, path));
  }
}

// Constructs a command from the argument body
BaseCtrl.prototype.getCommand = function (path, req) {
  if ('function' === typeof this.commands[path]) {
    return this.commands[path].call(this, req);
  }
  var cmd = this.commands[path];
  var args = []
  var data = req.body
  if (cmd instanceof AbstractGameCommand) {
    args.push(req.gameID);
  }
  args = args.concat(getArgs(cmd, data);
  return applyToConstructor(cmd, args)
}

function getArgs(cmd, data) {
  var args = []
  if (!data || !cmd.params) return args
  for (var key in data) {
    if (cmd.params.indexOf(key) === -1) {
      return new Error('Unexpected parameter: ' + key);
    }
  }
  var val;
  for (var i=0; i<cmd.params.length; i++) {
    val = data[cmd.params[i]]
    if (val === undefined) {
      return new Error('Expected parameter: ' + cmd.params[i]);
    }
    args.push(val)
  }
  if (!cmd.optional) return args;
  for (var i=0; i<cmd.optional.length; i++) {
    args.push(data[cmd.params[i]])
  }
  return args
}

function applyToConstructor(constructor, argArray) {
  var args = [null].concat(argArray);
  var factoryFunction = constructor.bind.apply(constructor, args);
  return new factoryFunction();
}

BaseCtrl.prototype.commandRoute = function (path, req, res) {
  // req.params
  var command = this.getCommand(path, req);
  if (command instanceof Error) {
    return res.send(500, 'Error: ' + command.message);
  }
  command.execute(req.gameRoom);
  var response = command.response(req.gameRoom);
  if (response instanceof Error) {
    return res.send(400, 'Error: ' + response.message);
  }
  res.json(response);
}

