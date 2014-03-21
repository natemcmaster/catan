module.exports = Injector;
var InjectorError = require('./Errors').InjectorError;

function Injector() {
  this.dependencies = {};
  return this;
}

Injector.prototype.register = function(name, obj) {
  this.dependencies[name] = {
    initializer: obj,
    dependencies: dpFromArgs(obj),
    variables: variablesFromArgs(obj)
  };
}

Injector.prototype.resolve = function(name) {
  if (!this.dependencies[name])
    throw new InjectorError('Could not resolve: $' + name);
  return this.dependencies[name];
}

/**
 * Creates an instance of the requested module, and
 * injects all dependencies with a new instance of that dependency
 * @param  {string} name Name of the module to create
 * @param {arguments...} arguments All arguments index > 0 are passed to the constructor
 * @return {Object}      An instance of the module
 */
Injector.prototype.create = function(name) {
  var initer = factory.call(this, name);
  return initer.apply(initer,Array.prototype.slice.call(arguments, 1));
}

// #Private 

var factory = function(name,stack) {
  stack = stack || [];
  if(~stack.indexOf(name))
    throw new InjectorError('Circular references');
  var dep = this.resolve(name);
  var dependents = [];
  stack.push(name);
  stack.concat(dep.dependencies);
  for (var i = 0; i < dep.dependencies.length; i++) {
    dependents.push(factory.call(this,dep.dependencies[i],stack));
  };

  return function() {
    var dataArgs = Array.prototype.slice.call(arguments, 0, dep.variables.length);
    var args = dataArgs.concat(dependents);
    var obj, instance;

    function fakeConstructor(){}
    fakeConstructor.prototype = Object.create(dep.initializer.prototype)
    obj = new fakeConstructor();
    obj.constructor = dep.initializer.constructor;

    instance = dep.initializer.apply(obj,args);

    if (instance !== null && (typeof instance === "object" || typeof instance === "function")) {
      obj = instance;
    }
    return obj;
  }
}

/**
 * This reads the function description and finds all arguments that begin
 * with the dollar sign. Returns a list of these arguments WITHOUT the dollar sign.
 * @param  {function} func Function of analyze
 * @return {Array}      List of all arguments with dollar sign
 */
var dpFromArgs = function(func) {
  var dep = [];
  var args = argList(func);
  for (var i = 0; i < args.length; i++) {
    var t = args[i];
    if (t[0] === '$') {
      dep.push(t.substr(1));
    }
  }
  return dep;
}

/**
 * This reads the function description and finds all arguments that DO NOT begin
 * with the dollar sign.
 * @param  {function} func Function of analyze
 * @return {Array}      List of all arguments with dollar sign
 */
var variablesFromArgs = function(func) {
  var dep = [];
  var args = argList(func);
  for (var i = 0; i < args.length; i++) {
    var t = args[i];
    if (t[0] != '$') {
      dep.push(t.substr(1));
    }
  }
  return dep;
}

/**
 * Magic.
 * Creates a list of the named arguments for the given function
 * @param  {function} func Function
 * @return {Array}      list of the named arguments
 */
var argList = function(func) {
  var desc = func.toString();
  var fn_r = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var m = desc.match(fn_r)[1];
  if (!m)
    return dep;
  var args = m.split(',');
  for (var i = args.length - 1; i >= 0; i--) {
    args[i] = args[i].trim();
  };
  return args;
}