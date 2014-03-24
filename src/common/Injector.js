module.exports = Injector;
var InjectorError = require('./Errors').InjectorError,
  util = require('util'),
  _ = require('underscore');

/**
 * @class Injector.Dependency
 * @constructor
 * @param {Function} construct       Constructor the the object
 * @param {boolean} singleton Singleton. Default = false
 * @property dependencies List of the IDs of the dependencies
 */
function Dependency(obj, singleton) {
  this.initializer = obj;
  this.dependencies = dpFromArgs(obj);
  this.variables = variablesFromArgs(obj);
  this.singleton = singleton || false;
  this.instance = null;
}

Injector.Dependency = Dependency;

/**
 * Creates a new instance of injector
 * @constructor Injector
 * @class Injector
 */
function Injector() {
  this.dependencies = {};
  return this;
}

/**
 * Creates a new Dependency
 * @method register
 * @param  {string} id Unique Id for dependency
 * @param  {constructor} obj  Constructor of the object
 * @return {Injector.Dependency}      the generated dependency
 */
Injector.prototype.register = function(id, obj) {
  checkExisting.call(this,id);
  if(!obj)
    throw new InjectorError('Cannot register ('+id+') with an undefined object');
  return this.dependencies[id] = new Dependency(obj);
}

/**
 * Utility function. Maps an object of key:value pairs
 * Example: inj.map({'Bank':MockBank})
 * is the same as inj.register('Bank',MockBank)
 * @method map
 * @param  {object} mapping key value pairs of id an constructors
 * @return {void}
 */
Injector.prototype.map = function(mp) {
  for (var id in mp) {
    this.register(id, mp[id]);
  }
}

/**
 * Utility function. Maps an object of key:value pairs
 * Example: inj.map({'Bank':MockBank})
 * is the same as inj.singleton('Bank',MockBank)
 * @method map
 * @param  {object} mapping key value pairs of id an constructors
 * @return {void}
 */
Injector.prototype.mapSingleton = function(mp) {
  for (var id in mp) {
    this.singleton(id, mp[id]);
  }
}

/**
 * Returns the dependendey matchin that name.
 * Throws an InjectorError if the name is not matched
 * @method find
 * @param  {string} name Name of dependency
 * @return {Injector.Dependency} the parsed dependency
 */
Injector.prototype.find = function(name) {
  if (!this.dependencies[name])
    throw new InjectorError('Could not find: $' + name);
  return this.dependencies[name];
}

/**
 * Returns the dependendey matching that name or null if there is none
 * @method find
 * @param  {string} name Name of dependency
 * @return {Injector.Dependency} the parsed dependency
 */
Injector.prototype.maybeFind = function (name) {
  return this.dependencies[name] || null;
}

/**
 * Creates an instance of the requested module, and
 * injects all dependencies with a new instance of that dependency
 * If dependency was registered as a singleton, it does not recreate a new object
 * @method create
 * @param  {string} name Name of the module to create
 * @param {arguments...} arguments All arguments index > 0 are passed to the constructor
 * @return {Object}      An instance of the module
 */
Injector.prototype.create = function(name) {
  var initer = this.resolve(name);
  return initer.apply(initer, _(arguments).toArray().slice(1));
}

/**
 * Returns the injected, dyanmic constructor for an object
 * @method resolve
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
 * @method inject
 * @param  {Function} func Function to inject
 * @return {Function}      Function with matched dependencies
 */
Injector.prototype.inject = function(func) {
  if (!func)
    throw new InjectorError('Cannot inject undefined function')
 
  var dep = new Dependency(func);
  var args = [];
  for (var x in dep.dependencies) {
    args.push(namedFactory.call(this, dep.dependencies[x]));
  };

  return function() {
    var a = _(arguments).toArray().concat(args);
    return func.apply(this, a);
  };
}

/**
 * Same as register, except there can only be on instance of this object
 * @method singleton
 * @param  {string} id Unique Id for dependency
 * @param  {constructor} obj  Constructor of the object
 * @return {Injector.Dependency}      the generated dependency
 */
Injector.prototype.singleton = function(id, dep) {
  checkExisting.call(this, id);
  if(!dep)
    throw new InjectorError('Cannot register singleton ('+id+') with an undefined object')
  return this.dependencies[id] = new Dependency(dep, true);
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

  return dynamicConstructor(dep, dependents);
}

var dynamicConstructor = function(dep, dependents) {

  if (dep.singleton && dep.instance != null) {
    return function() {
      return dep.instance;
    };
  }

  var construct = function() {
    if (dep.singleton && dep.instance != null) {
      return dep.instance;
    }
    var args = _(arguments).toArray();
    //Aligh data arguments with the constructor
    var dataArgs = args.splice(0, dep.variables.length);
    if (dataArgs.length < dep.variables.length) {
      dataArgs = dataArgs.concat(new Array(dep.variables.length - dataArgs.length));
    }
    var a = dataArgs.concat(dependents);
    // apply eny left over args
    a = a.concat(args);
    var obj, instance;

    function fakeConstructor() {}
    fakeConstructor.prototype = Object.create(dep.initializer.prototype)
    obj = new fakeConstructor();
    obj.constructor = dep.initializer.constructor;
    if(dep.initializer.name)
      obj.name = dep.initializer.name;

    instance = dep.initializer.apply(obj, a);

    if (instance !== null && (typeof instance === "object" || typeof instance === "function")) {
      obj = instance;
    }
    if (dep.singleton) {
      dep.instance = obj;
    }
    return obj;
  }
  // add static methods for nested dependencies
  for (var x in dep.initializer) {
    if (('function' === typeof dep.initializer[x] || dep.initializer.hasOwnProperty(x)) && x !== 'constructor')
      construct[x] = dep.initializer[x];
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
  if(!func)
    throw new InjectorError('Cannot inject an undefined object');
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

/**
 * Checks if dependency alreayd exists
 */
var checkExisting = function(id) {
  var d = this.dependencies[id];
  if (d) {
    if (d.singleton) {
      throw new InjectorError('Cannot overwrite a singleton registration');
    }
    console.warn('Overwriting previous defined dependency: ' + id);
  }
}
