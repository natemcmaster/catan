/**
 These functions are in the default namespace and provide core functionality such as inheritance.
 
 @module core
 @namespace core
*/
 
/**
 This really isn't a class. These are actually standalone functions.
  
 @class Core
 @static
 */
core = (function MakeCoreClass(){
	/**
	 Returns a newly created object that inherits properties from the
	 prototype object p.  It uses the ECMAScript 5 function Object.create() if
	 it is defined, and otherwise falls back to an older technique.
	 @method inherit
	 @param {Object} p Non-null object. P stands for parent. It's the object to extend
	 @return {Object} An object that extends p.
	 * */
	function inherit (p) {
		if (p == null) throw TypeError(); // p must be a non-null object
		if (Object.create)                // If Object.create() is defined...
			return Object.create(p);      //    then just use it.
		var t = typeof p;                 // Otherwise do some more type checking
		if (t !== "object" && t !== "function") throw TypeError();
		function f() {};                  // Define a dummy constructor function.
		f.prototype = p;                  // Set its prototype property to p.
		return new f();                   // Use f() to create an "heir" of p.
	};

	/**
	 This function creates a new enumerated type.  The argument object specifies
	 the names and values of each instance of the class. The return value
	 is a constructor function that identifies the new class.  Note, however
	 that the constructor throws an exception: you can't use it to create new
	 instances of the type.  The returned constructor has properties that 
	 map the name of a value to the value itself, and also a values array,
	 a foreach() iterator function
	  
	 @method enumeration
	 @param namesToValues an object with named values
	 @return an enumeration
	 */
	function enumeration (namesToValues) {
		// This is the dummy constructor function that will be the return value.
		var enumeration = function () { throw "Can't Instantiate Enumerations"; };

		// Enumerated values inherit from this object.
		var proto = enumeration.prototype = {
			constructor: enumeration,                   // Identify type
			toString: function () { return this.name; }, // Return name
			valueOf: function () { return this.value; }, // Return value
			toJSON: function () { return this.name; }    // For serialization
		};

		enumeration.values = [];  // An array of the enumerated value objects

		// Now create the instances of this new type.
		for (name in namesToValues) {         // For each value 
			var e = inherit(proto);          // Create an object to represent it
			e.name = name;                   // Give it a name
			e.value = namesToValues[name];   // And a value
			enumeration[name] = e;           // Make it a property of constructor
			enumeration.values.push(e);      // And store in the values array
		}
		// A class method for iterating the instances of the class
		enumeration.foreach = function (f, c) {
			for (var i = 0; i < this.values.length; i++) f.call(c, this.values[i]);
		};

		// Return the constructor that identifies the new type
		return enumeration;
	};
	
	function numberEnumeration(inputArray){
		var toReturn = {};
		for (var index = 0; index < inputArray.length; ++index) {
			toReturn[inputArray[index]]=index;
		}
		return toReturn;
	};


	function abstractMethod () { 
		throw new Error("abstract method");
	};


	function defineProperty (obj, propName) {
		var methodName = propName.charAt(0).toUpperCase() + propName.slice(1);
		obj["get" + methodName] = function() {
			return this[propName];
		};
		obj["set" + methodName] = function(value) {
			return this[propName] = value;
		};
		obj["has" + methodName] = function() {
			return (this[propName] ? true : false);
		};
	};

	function assert (value) {
		console.assert(value);
		//if (!value)
		//	throw Error("assertion failed");
	};
	/**
	 This makes a function that can be set as an onclick, etc.
	 If the inputFunction is a string, the return function when run will
	 attempt to find that function on the inputObject. That means that it's 
	 possible to change the function on the inputObject without having to call
	 this again.
	 
	 If the inputFunction is a function and not a string, then the function is stored.
	 
	 In both cases, the returned function will take the inputFunction and run it
	 with any references to "this" in the inputFunction refering to the inputObject.
	 The args are passed and the "this" reference change is done using the 
	 native JS function "apply".
	 
	 @method makeAnonymousAction
	 @param {Object} inputObject The object to be refered to as "this" in the inputFunction
	 @param {String || Function } inputFunction The function that needs to be run. If it's a string, when
												it's requested to run it's looked up dynamically on the inputObject
	 @param {Array<Object>} args An array of arguements to be passed to the inputFunction
	 @return A function that when run, will run inputFunction.apply(inputObject, args);
	 */
	function makeAnonymousAction(inputObject, inputFunction, args){
		var self = inputObject;
		if (typeof inputFunction === "string"){
			return function(){
				self[inputFunction].apply(self,args);
			};		
		} else {
			return function(){
				inputFunction.apply(self,args);
			};
		}
	};
	
	function forceClassInherit(classA,classB){
		classA.prototype = inherit(classB.prototype);
		classA.prototype.constructor = classA;
	}
    
    function merge(target,newStuff,ignore){
        if (typeof newStuff == "function" || typeof newStuff == "object"){
            if (target === undefined){
                target = {};
            }
            for (var prop in newStuff) {
                if(newStuff.hasOwnProperty(prop) && ignore.indexOf(prop) == -1){
                    var propVal = newStuff[prop]
                    if (propVal !== undefined){
                        target[prop] = merge(target[prop],propVal,ignore)
                    }
                }
            }
            return target
        } else {
            return newStuff
        }
    }
	
	return {
		inherit:inherit,
		forceClassInherit:forceClassInherit,
		enumeration:enumeration,
		numberEnumeration:numberEnumeration,
		abstractMethod:abstractMethod,
		defineProperty:defineProperty,
		assert:assert,
		makeAnonymousAction:makeAnonymousAction,
        merge:merge
	};
}());

