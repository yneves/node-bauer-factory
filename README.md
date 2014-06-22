node-bauer-factory
================

General utilities for nodejs.

	var factory = require("bauer-factory");

	// string | number | boolean | date | regexp | error
	// array | object | arguments | undefined | function | promise
	factory.type(arg) 

	factory.isNull(arg) // type == "undefined"
	factory.isDate(arg) // type == "date"
	factory.isError(arg) // type == "error"
	factory.isArray(arg) // type == "array"
	factory.isNumber(arg) // type == "number"
	factory.isString(arg) // type == "string"
	factory.isObject(arg) // type == "object"
	factory.isRegExp(arg) // type == "regexp"
	factory.isFunction(arg) // type == "function"
	factory.isPromise(arg) // type == "promise"
	factory.isArguments(arg) // type == "arguments"

	// coerces given argument into array
	factory.toArray(arg)

	// extends factory itself
	factory.extend(methods) 

	// extends the original object
	factory.extend(original,object0,object1) 

	// extends the given class
	factory.extend(class,methods) 

	// deepEqual && notStrictDeepEqual 
	factory.clone(arg) 

	// TODOC
	factory.class(methods)
	factory.object(methods)
	factory.method(signatures)
