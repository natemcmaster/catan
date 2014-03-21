module.exports = Injector;
var InjectorError = require('./Errors').InjectorError,
  util = require('util');

function Injector() {
  this.dependencies = {};
  return this;
}

function Dependency(obj) {
  this.initializer = obj;
  this.dependencies = dpFromArgs(obj);
  this.variables = variablesFromArgs(obj);
}

Injector.Dependency = Dependency;

/**
 * Creates a new Dependency
 * @param  {string} id Unique Id for dependency
 * @param  {constructor} obj  Constructor of the object
 * @return {Injector.Dependency}      [description]
 */
Injector.prototype.register = function(id, obj) {
  return this.dependencies[id] = new Dependency(obj);
}

/**
 * Utility function. Maps an object of key:value pairs
 * Example: inj.map({'Bank':MockBank})
 * is the same as inj.register('Bank',MockBank)
 * @param  {object} mapping key value pairs of id an constructors
 * @return {void}
 */
Injector.prototype.map = function(mp) {
  for (var id in mp) {
    this.register(id, mp[id]);
  }
}

/**
 * Returns the dependendey matchin that name.
 * Throws an InjectorError if the name is now matched
 * @param  {string} name Name of dependency
 * @return {object} the parsed dependency
 */
Injector.prototype.find = function(name) {
  if (!this.dependencies[name])
    throw new InjectorError('Could not find: $' + name);
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
  var initer = this.resolve(name);
  return initer.apply(initer, Array.prototype.slice.call(arguments, 1));
}

/**
 * Returns the injected, dyanmic constructor for an object
 * @param  {string} name Name of the module to create
 * @return {Function}      A dynamic constructor
 */
Injector.prototype.resolve = function(name) {
  try {
    var initer = namedFactory.call(this, name);
  } catch (e) {
    if (e instanceof InjectorError) {
      e.message += ': Could not create ' + name;
    }
    throw e;
  }
  return initer;
}

/**
 * Injects an anonymous function with dependencies. This produces a function
 * @param  {Function} func Function to inject
 * @return {Function}      Function with matched dependencies
 */
Injector.prototype.inject = function(func) {
  var dep = new Dependency(func);
  var args = [];
  for (var x in dep.dependencies) {
    args.push(namedFactory.call(this, dep.dependencies[x]));
  };

  return function() {
    var a = Array.prototype.slice.call(arguments, 0).concat(args);
    return func.apply(this, a);
  };
}

// #Private 

var namedFactory = function(name, stack) {
  stack = stack || [];
  if (~stack.indexOf(name))
    throw new InjectorError('Circular references');
  var dep = this.find(name);
  var dependents = [];
  stack.push(name);
  stack.concat(dep.dependencies);
  for (var i = 0; i < dep.dependencies.length; i++) {
    dependents.push(namedFactory.call(this, dep.dependencies[i], stack));
  };

  return dynamicConstructor(dep.initializer, dependents, dep.variables);
}

var dynamicConstructor = function(initializer, dependents, variables) {
  var construct = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    //Aligh data arguments with the constructor
    var dataArgs = args.splice(0, variables.length);
    if (dataArgs.length < variables.length) {
      dataArgs = dataArgs.concat(new Array(variables.length - dataArgs.length));
    }
    var a = dataArgs.concat(dependents);
    // apply eny left over args
    a = a.concat(args);
    var obj, instance;

    function fakeConstructor() {}
    fakeConstructor.prototype = Object.create(initializer.prototype)
    obj = new fakeConstructor();
    obj.constructor = initializer.constructor;

    instance = initializer.apply(obj, a);

    if (instance !== null && (typeof instance === "object" || typeof instance === "function")) {
      obj = instance;
    }

    return obj;
  }
  // add static methods for nested dependencies
  for (var x in initializer) {
    if ('function' === typeof initializer[x] && x !== 'constructor')
      construct[x] = initializer[x];
  }
  return construct;
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
      dep.push(t);
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
  var m = desc.match(fn_r);
  if (!m)
    return [];
  var args = m[1].split(',');
  for (var i = args.length - 1; i >= 0; i--) {
    args[i] = args[i].trim();
  };
  return args;
}