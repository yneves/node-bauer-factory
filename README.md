node-bauer-factory
================

General utilities for nodejs.

## Installation

```
npm install bauer-factory
```

## Usage

```js
var factory = require("bauer-factory");
```

## .type

Returned value can be string, number, boolean, date, regexp, error, array, object, arguments, undefined or function. 

* Null is considered to be of type `undefined`.

```js
// returns type of given argument
var type = factory.type(arg);
```

## .isNull

```js
factory.isNull(arg)
// same as
factory.type(arg) == "undefined"
```

## .isDate

```js
factory.isDate(arg) 
// same as
factory.type(arg) == "date"
```

## .isError

```js
factory.isError(arg) 
// same as
factory.type(arg) == "error"
```

## .isBoolean

```js
factory.isBoolean(arg) 
// same as
factory.type(arg) == "boolean"
```

## .isArray

```js
factory.isArray(arg) 
// same as
factory.type(arg) == "array"
```

## .isNumber

```js
factory.isNumber(arg) 
// same as
factory.type(arg) == "number"
```

## .isString

```js
factory.isString(arg) 
// same as
factory.type(arg) == "string"
```

## .isObject

```js
factory.isObject(arg) 
// same as
factory.type(arg) == "object"
```

## .isRegExp

```js
factory.isRegExp(arg) 
// same as
factory.type(arg) == "regexp"
```

## .isFunction

```js
factory.isFunction(arg) 
// same as
factory.type(arg) == "function"
```

## .isArguments

```js
factory.isArguments(arg) 
// same as
factory.type(arg) == "arguments"
```

## .toArray

Coerces given argument into array.

```js
factory.toArray(arg)
// same as
Array.prototype.slice.call(arg)
```

## .extend

Performs a superficial extension on objects or classes.

```js
// extends the original object and returns it
factory.extend(original,object0,object1,object2) 
```

```js
// calling with one argument extends factory itself
// methods is an object having key as the method name 
// value is passed through factory.method
factory.extend(methods) 
```

```js
// calling with a function as first argument extends its prototype
// methods is an object having key as the method name 
// value is passed through factory.method
factory.extend(class,methods) 
```

## .clone

Returns an equally deep copy of given argument. Works with arrays and objects, values of any other type are bypassed.  

```js
// deepEqual && notStrictDeepEqual 
factory.clone(arg) 
```

## .method

Accepts an object containing types/lengths as keys and values as functions.

```js
var func = factory.method({
	0: function() {}, // executed if called with zero arguments
	s: function(s) {}, // executed if called with one string
	sf: function(s) {}, // executed if called with a string and a function
	_: function() {}, // executed if none of the above is matched
});
```

Letters are taken as the first character of the argument's type as returned by `factory.type`. Any combination can be used to route the function execution. This takes priority over argument's length routing.

```js
var func = factory.method({
	o: function() {}, // executed if called with object
	a: function(s) {}, // executed if called with array or arguments
	sffb: function(s,f0,f1,b) {}, // executed if called with a string, two functions and a boolean
});
```

Numbers are taken as the length of the arguments object. Nested rules are supported.

```js
var func = factory.method({
	5: { // executed if called with five arguments
		sssss: function() {}, // five strings
		assss: function() {}, // one array and four strings
	}, 
	1: function(arg) {}, // executed if called with one argument
});
```

Underscore holds the default code. If no rule is matched and there's no `_` throws an `ReferenceError`.

```js
var func = factory.method({
	_: function() {},
});
```

Strings can be used as code. They are converted to functions internally with the defined arguments.

```js
var func = factory.method({
	s: "return this.get(s)", // the given string can be refered as 's'
	ss: "return this.both(s0,s1)", // if it's two strings, just add the index
	f: "this.on('ready',f)", // easy to define aliases
});
```

## .class

Creates a class with given methods, constructor and inheritance.

```js
var Bauer = factory.class({

	// requires 'events' and inherits EventEmitter from it
	// also accepts functions
	inherits: "events.EventEmitter",

	// called when new Bauer() is executed
	// it can also be routed by factory.method if needed
	constructor: function() {
	},

	// methods are created by factory.method
	killTerrorists: {
	},
	
	tortureSuspects: {
	},
	
	doWhateverItsNecessary: function() {},

});
```

The created class can be instantiated and inherited just like any other class.

```js
var jack = new Bauer();

jack.killTerrorists();

jack.tortureSuspects();

jack.doWhateverItsNecessary();
```

## .object

Creates a class just like .class does and returns an instance of it.

```js
// accepts same arguments as .class
var jack = factory.object({

	// requires 'events' and inherits EventEmitter from it
	// also accepts functions
	inherits: "events.EventEmitter",

	// called when new Bauer() is executed
	// it can also be routed by factory.method if needed
	constructor: function() {
	},

	// methods are created by factory.method
	killTerrorists: {
		s: function() {},
		n: function() {},
	},

	tortureSuspects: {
		1: function() {},
		2: function() {},
	},

	doWhateverItsNecessary: function() {},

});
```