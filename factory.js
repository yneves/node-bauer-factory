/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/
// - -------------------------------------------------------------------- - //
// - libs

var lib = {
	util: require("util"),
};

var factory = {};

// - -------------------------------------------------------------------- - //
// - stuff

function createFunction(method,signature) {
	var methodType = factory.type(method);
	if (methodType === "function") {
		return method;
	} else if (methodType === "string") {
		var methodArgs = [];
		if (/^[fabsnderuo]+$/.test(signature)) {
			var count = {};
			var index = {};
			var signLength = signature.length;
			for (var i = 0; i < signLength; i++) {
				var arg = signature[i];
				if (count[arg]) {
					count[arg]++;
				} else {
					count[arg] = 1;
				}
				index[arg] = 0;
			}
			for (var i = 0; i < signLength; i++) {
				var arg = signature[i];
				if (count[arg] > 1) {
					methodArgs.push(arg + "" + index[arg]);
					index[arg]++;
				} else {
					methodArgs.push(arg);
				}
			}
		}
		methodArgs.push(method);
		return Function.constructor.apply(Function,methodArgs);
	} else if (methodType === "error") {
		return function() { throw method; };
	} else if (methodType === "object") {
		return createMethod(method);
	} else if (methodType === "undefined") {
		return function() {};
	}
}

function getFunctionCode(method) {
	var methodText = method.toString();
	var methodWithArgs = methodText.match(/function [\w]*\(([\w\,\s]+)\)\s*/);
	if (methodWithArgs && methodWithArgs[1]) {
		var methodCode = methodText.substr(methodWithArgs[0].length).trim().replace(/^\{|\}$/g,"").trim();
		var methodArgs = methodWithArgs[1].split(/\s*,\s*/).map(function(arg,idx) {
			return "var " + arg + " = arguments[" + idx + "];";
		});
		return methodArgs.join("\n") + "\n" + methodCode + ";";
	} else {
		var methodWithoutArgs = methodText.match(/function [\w]*\(\)\s*/);
		if (methodWithoutArgs) {
			var methodCode = methodText.substr(methodWithoutArgs[0].length).trim().replace(/^\{|\}$/g,"").trim();
			return methodCode + ";";
		}
	}
}

function createExpression(type,index) {
	var expression;
	var argument = "arguments[" + index + "]";
	switch (type) {
		case "f":
			expression = argument + " instanceof Function";
			break;
		case "a":
			expression = argument + " instanceof Array";
			break;
		case "b":
			expression = "(" + argument + " instanceof Boolean || typeof " + argument + " === 'boolean')";
			break;
		case "s":
			expression = "(" + argument + " instanceof String || typeof " + argument + " === 'string')";
			break;
		case "n":
			expression = "(" + argument + " instanceof Number || typeof " + argument + " === 'number')";
			break;
		case "d":
			expression = argument + " instanceof Date";
			break;
		case "e":
			expression = argument + " instanceof Error";
			break;
		case "r":
			expression = argument + " instanceof RegExp";
			break;
		case "u":
			expression = "(" + argument + " === null || typeof " + argument + " === 'undefined')";
			break;
		case "o":
			expression = argument + " instanceof Object";
			break;
		case "_":
			expression = "return methods[" + index + "].apply(this,arguments)";
			break;
		default:
		 	expression = "len === " + type;
			break;
	}
	return expression;
}

function recurseMethodTree(tree,index,methods) {
	var code = [];
	var keys = Object.keys(tree).sort();
	var keysLength = keys.length;
	for (var i = 0; i < keysLength; i++) {
		var key = keys[i];
		var val = tree[key];
		var vtype = factory.type(val);
		if (vtype === "object") {
			code.push("if (" + createExpression(key,index) + ") {")
			code.push.apply(code,recurseMethodTree(val,index + 1,methods));
			code.push("}");
		} else if (vtype === "number") {
			if (methods) {
				code.push(methods[val]);
			} else {
				code.push(createExpression(key,val));
			}
		}
	}
	return code;
}

function createMethod(signatures,embedCode) {
	var tree = {};
	var methods = [];
	var keys = Object.keys(signatures);
	var keysLength = keys.length;
	for (var s = 0; s < keysLength; s++) {
		var key = keys[s];
		var method = createFunction(signatures[key],key);
		var methodIndex = methods.length;
		methods.push(method);
		if (/^[0-9]+$/.test(key)) {
			if (!tree[key]) {
				tree[key] = {};
			}
			tree[key]._ = methodIndex;
		} else if (/^[fabsnderuo]+$/.test(key)) {
			var keyLength = key.length;
			if (!tree[keyLength]) {
				tree[keyLength] = {};
			}
			var treeWalk = tree[keyLength];
			for (var i = 0; i < keyLength; i++) {
				var type = key[i];
				if (!treeWalk[type]) {
					treeWalk[type] = {};
				}
				treeWalk = treeWalk[type];
			}
			treeWalk._ = methodIndex;
		} else if (key === "_") {
			tree._ = methodIndex;
		}
	}
	if (embedCode) {
		var methodsCode = methods.map(getFunctionCode);
		var code = recurseMethodTree(tree,-1,methodsCode);
		code.unshift("var len = arguments.length;");
		code.push("throw new ReferenceError('signature not found');");
		code = code.join("\n");
		return new Function(code);
	} else {
		var code = recurseMethodTree(tree,-1);
		code.unshift("return function() {","var len = arguments.length;");
		code.push("throw new ReferenceError('signature not found');","}");
		code = code.join("\n");
		return new Function("methods",code)(methods);
	}
}

// - -------------------------------------------------------------------- - //

// .type(arg)
factory.type = function(arg) {
	var type = typeof arg;
	if (type === "object") {
		if (arg === null) {
			type = "undefined";
		} else if (arg instanceof Error) {
			type = "error";
		} else if (arg instanceof Array) {
			type = "array";
		} else if (arg instanceof Date) {
			type = "date";
		} else if (arg instanceof RegExp) {
			type = "regexp";
		} else if (arg instanceof String) {
			type = "string";
		} else if (arg instanceof Number) {
			type = "number";
		} else if (arg instanceof Boolean) {
			type = "boolean";
		} else {
			var toString = Object.prototype.toString.call(arg);
			if (toString === "[object Arguments]") {
				type = "arguments";
			}
		}
	}
	return type;
};

// - -------------------------------------------------------------------- - //

factory.method = createMethod({

	// .method(function)
	f: "return f",

	// .method(signatures)
	o: createMethod,

	// .method(signatures,embedCode)
	ob: createMethod,

	// .method(error)
	e: "return function() { throw e }",

	// .method(code)
	s: "return new Function(s)",

	// .method(undefined)
	u: "return function() {}",

});

// - -------------------------------------------------------------------- - //

// .extend()
factory.extend = createMethod({

	// .extend(factory)
	o: function(methods) {
		var keys = Object.keys(methods);
		var len = keys.length;
		for (var i = 0; i < len; i++) {
			var key = keys[i];
			factory[key] = factory.method(methods[key]);
		}
		return factory;
	},

	// .extend(original,object)
	oo: function(original,object) {
		var keys = Object.keys(object);
		var len = keys.length;
		for (var i = 0; i < len; i++) {
			var key = keys[i];
			original[key] = object[key];
		}
		return original;
	},

	// .extend(class,methods)
	fo: function(cls,methods) {
		var keys = Object.keys(methods);
		var len = keys.length;
		for (var i = 0; i < len; i++) {
			var key = keys[i];
			cls.prototype[key] = factory.method(methods[key]);
		}
		return cls;
	},

	// .extend(arg0, arg1, ...)
	_: function() {
		var type = factory.type(arguments[0]);
		if (type == "object") {
			for (var i = 1; i < arguments.length; i++) {
				var arg = arguments[i];
				var atype = factory.type(arg);
				if (atype == "object") {
					var keys = Object.keys(arg);
					var len = keys.length;
					for (var a = 0; a < len; a++) {
						var key = keys[a];
						arguments[0][key] = arg[key];
					}
				}
			}
		} else if (type == "function") {
			for (var i = 1; i < arguments.length; i++) {
				var arg = arguments[i];
				var atype = factory.type(arg);
				if (atype == "object") {
					var keys = Object.keys(arg);
					var len = keys.length;
					for (var a = 0; a < len; a++) {
						var key = keys[a];
						arguments[0].prototype[key] = factory.method(arg[key]);
					}
				}
			}
		}
		return arguments[0];
	},

});

// - -------------------------------------------------------------------- - //

factory.clone = createMethod({

	// .clone(object)
	o: function(object) {
		var clone = {};
		var keys = Object.keys(object);
		var len = keys.length;
		for (var i = 0; i < len; i++) {
			var key = keys[i];
			clone[key] = factory.clone(object[key]);
		}
		return clone;
	},

	// .clone(array)
	a: function(array) {
		var clone = [];
		var len = array.length;
		for (var i = 0; i < len; i++) {
			clone[i] = factory.clone(array[i]);
		}
		return clone;
	},

	// .clone(date)
	d: function(date) {
		return new Date(date.getTime());
	},

	// .clone(arg)
	_: function(arg) {
		return arg;
	},

});

// - -------------------------------------------------------------------- - //

factory.inherits = createMethod({

	// .inherits(class,super)
	fa: function(cls,superClass) {
		factory.inherits(cls,superClass[0]);
	},

	// .inherits(class,super)
	fs: function(cls,superClass) {
		var parts = superClass.split(".");
		if (parts.length == 2) {
			factory.inherits(cls,require(parts[0])[parts[1]])
		} else if (parts.length == 1) {
			factory.inherits(cls,require(parts[0]));
		}
	},

	// .inherits(class,super)
	ff: function(cls,superClass) {
		cls.super_ = superClass;
		cls.prototype = Object.create(superClass.prototype,{
			constructor: {
				value: cls,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
	},

});

// - -------------------------------------------------------------------- - //

factory.class = createMethod({

	// .class(methods)
	o: function(methods) {
		var constructor = factory.method(methods.constructor);
		var cls = function() {
			if (cls.super_) {
				cls.super_.apply(this,arguments);
			}
			constructor.apply(this,arguments);
		};
		if (methods.inherits) {
			factory.inherits(cls,methods.inherits);
		}
		var keys = Object.keys(methods);
		var len = keys.length;
		for (var i = 0; i < len; i++) {
			var key = keys[i];
			if (key != "constructor" && key != "inherits") {
				cls.prototype[key] = factory.method(methods[key]);
			}
		}
		return cls;
	},

});

// - -------------------------------------------------------------------- - //

// .object(methods)
factory.object = function(methods) {
	var cls = factory.class(methods);
	return new cls();
};

// - -------------------------------------------------------------------- - //

factory.extend({

	// .toArray(arg)
	toArray: function(arg) { return Array.prototype.slice.call(arg); },

	// .isNull(arg)
	isNull: function(arg) { return factory.type(arg) === "undefined" },

	// .isDate(arg)
	isDate: function(arg) { return factory.type(arg) === "date" },

	// .isError(arg)
	isError: function(arg) { return factory.type(arg) === "error" },

	// .isArray(arg)
	isArray: function(arg) { return factory.type(arg) === "array" },

	// .isNumber(arg)
	isNumber: function(arg) { return factory.type(arg) === "number" },

	// .isString(arg)
	isString: function(arg) { return factory.type(arg) === "string" },

	// .isObject(arg)
	isObject: function(arg) { return factory.type(arg) === "object" },

	// .isRegExp(arg)
	isRegExp: function(arg) { return factory.type(arg) === "regexp" },

	// .isBoolean(arg)
	isBoolean: function(arg) { return factory.type(arg) === "boolean" },

	// .isFunction(arg)
	isFunction: function(arg) { return factory.type(arg) === "function" },

	// .isArguments(arg)
	isArguments: function(arg) { return factory.type(arg) === "arguments" },

});

// - -------------------------------------------------------------------- - //

factory.extend({

	// .guid()
	guid: function() {
	  var uid = "";
	  for (var i = 0; i < 8 ; i++) {
	    uid += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return uid;
	},

});

// - -------------------------------------------------------------------- - //

module.exports = exports = factory;

// - -------------------------------------------------------------------- - //
