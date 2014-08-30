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
		if (/[abofdresnup]/.test(signature)) {
			var count = {};
			var index = {};
			var types = signature.split("");
			types.forEach(function(arg) {
				if (count[arg]) {
					count[arg]++;
				} else {
					count[arg] = 1;
				}
				index[arg] = 0;
			});
			types.forEach(function(arg) {
				if (count[arg] > 1) {
					methodArgs.push(arg+""+index[arg]);
					index[arg]++;
				} else {
					methodArgs.push(arg);
				}
			});
		}
		methodArgs.push(method);
		return Function.constructor.apply(Function,methodArgs);
	} else {
		return factory.method(method);
	}
}

function createExpression(signature) {
	var signLength = signature.length;
	var exprList = [];
	for (var i = 0; i < signLength; i++) {
		var argType = signature[i];
		var argument = "arguments[" + i + "]";
		switch (argType) {
			case "f":
				exprList.push(argument + " instanceof Function");
				break;
			case "a":
				exprList.push(argument + " instanceof Array");
				break;
			case "b":
				exprList.push([argument + " instanceof Boolean","typeof " + argument + " === 'boolean'"]);
				break;
			case "s":
				exprList.push([argument + " instanceof String","typeof " + argument + " === 'string'"]);
				break;
			case "n":
				exprList.push([argument + " instanceof Number","typeof " + argument + " === 'number'"]);
				break;
			case "d":
				exprList.push(argument + " instanceof Date");
				break;
			case "e":
				exprList.push(argument + " instanceof Error");
				break;
			case "r":
				exprList.push(argument + " instanceof RegExp");
				break;
			case "u":
				exprList.push([argument + " === null","typeof " + argument + " === 'undefined'"]);
				break;
			case "o":
				exprList.push(argument + " instanceof Object");
				break;
		}
	}
	var exprLength = exprList.length;
	var exprText = "if (";
	for (var i = 0; i < exprLength; i++) {
		if (i > 0) {
			exprText += " && ";
		}
		if (exprList[i] instanceof Array) {
			exprText += "(" + exprList[i].join(" || ") + ")";
		} else {
			exprText +=  exprList[i];
		}
	}
	exprText += ")";
	return exprText;
}

function sortSignatures(a,b) {
	if (a.type === "default") {
		return 1;
	} else if (a.length > b.length) {
		return -1;
	} else if (a.length < b.length) {
		return 1;
	} else if (a.type === "length" && b.type === "type") {
		return 1;
	} else if (a.type === "type" && b.type === "length") {
		return -1;
	} else {
		return 0;
	}
}

function createSignatures(signatures) {
	var signs = [];
	var methods = [];
	var keys = Object.keys(signatures);
	var keysLength = keys.length;
	for (var s = 0; s < keysLength; s++) {
		var signature = keys[s];
		var method = createFunction(signatures[signature],signature);
		var methodIndex = methods.length;
		methods.push(method);
		var execText = "return methods[" + methodIndex + "].apply(this,arguments)";
		if (/^[0-9]+$/.test(signature)) {
			signs.push({
				length: signature,
				type: "length",
				code: execText,
			});
		} else if (/^[fabsnderuo]+$/.test(signature)) {
			signs.push({
				length: signature.length,
				type: "type",
				code: createExpression(signature) + " { " + execText + " }",
			});
		} else if (signature === "_") {
			signs.push({
				type: "default",
				code: execText,
			});
		}
	}
	var code = [
		"return function() { ",
		"var len = arguments.length;",
	];
	var lastLength;
	signs.sort(sortSignatures).forEach(function(sign) {
		if (lastLength === sign.length) {
		} else {
			if (lastLength) {
				code.push("}");
			}
			code.push("if (len === " + sign.length + ") {");
		}
		code.push(sign.code);
		lastLength = sign.length;
	});
	if (lastLength) {
		code.push("}");
	}
	code.push("throw new ReferenceError('signature not found');","}");
	return new Function("methods",code.join("\n"))(methods);
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

// .method(signatures);
factory.method = function(signatures) {
	var type = factory.type(signatures);
	if (type === "object") {
		return createSignatures(signatures);
	} else if (type === "error") {
		return function() { throw signatures; }
	} else if (type === "function") {
		return signatures;
	} else if (type === "string") {
		return new Function(signatures);
	} else if (type === "undefined") {
		return function() {};
	}
};

// - -------------------------------------------------------------------- - //

// .extend()
factory.extend = function(original) {
	var type = factory.type(original);

	// .extend(factory)
	if (type == "object" && arguments.length == 1){
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			var atype = factory.type(arg);
			if (atype == "object") {
				for (var key in arg) {
					factory[key] = factory.method(arg[key]);
				}
			}
		}

	// .extend(object)
	} else if (type == "object") {
		for (var i = 1; i < arguments.length; i++) {
			var arg = arguments[i];
			var atype = factory.type(arg);
			if (atype == "object") {
				for (var key in arg) {
					original[key] = arg[key];
				}
			}
		}
		return original;

	// .extend(class)
	} else if (type == "function") {
		for (var i = 1; i < arguments.length; i++) {
			var arg = arguments[i];
			var atype = factory.type(arg);
			if (atype == "object") {
				for (var key in arg) {
					original.prototype[key] = factory.method(arg[key]);
				}
			}
		}

	}
};

// - -------------------------------------------------------------------- - //

// .clone(arg)
factory.clone = function(arg) {
	var argtype = factory.type(arg)
	if (argtype == "object") {
		var clone = {};
		for (var key in arg) {
			var valtype = factory.type(arg[key]);
			if (valtype == "object" || valtype == "array") {
				clone[key] = factory.clone(arg[key]);
			} else {
				clone[key] = arg[key];
			}
		}
		return clone;
	} else if (argtype == "array") {
		var clone = [];
		for (var i = 0; i < arg.length; i++) {
			var valtype = factory.type(arg[i]);
			if (valtype == "object" || valtype == "array") {
				clone[i] = factory.clone(arg[i]);
			} else {
				clone[i] = arg[i];
			}
		}
		return clone;
	} else {
		return arg;
	}
}

// - -------------------------------------------------------------------- - //

// .class(methods)
factory.class = function(methods) {
	if (factory.type(methods) != "object") {
		methods = {};
	}
	if (factory.type(methods.inherits) != "array") {
		methods.inherits = [methods.inherits];
	}
	var inherits = [];
	for (var i = 0; i < methods.inherits.length; i++) {
		var cls = methods.inherits[i];
		var type = factory.type(cls);
		if (type == "string") {
			cls = cls.split(".");
			if (cls.length == 2) {
				inherits.push(require(cls[0])[cls[1]]);
			} else if (cls.length == 1) {
				inherits.push(require(cls[0]));
			}
		} else if (type == "function") {
			inherits.push(cls);
		}
	}
	var constructor = factory.method(methods.constructor);
	var cls = function() {
		for (var i = 0; i < inherits.length; i++) {
			inherits[i].apply(this,arguments);
		}
		constructor.apply(this,arguments);
	};
	if (inherits.length == 1) {
		lib.util.inherits(cls,inherits[0]);
	} else if (inherits.length > 1) {
		throw new Error("multiple inheritance not allowed");
	}
	for (var name in methods) {
		if (name != "constructor" && name != "inherits") {
			cls.prototype[name] = factory.method(methods[name]);
		}
	}
	return cls;
}

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

});

// - -------------------------------------------------------------------- - //

factory.extend({

	// .isNull(arg)
	isNull: function(arg) { return factory.type(arg) == "undefined" },

	// .isDate(arg)
	isDate: function(arg) { return factory.type(arg) == "date" },

	// .isError(arg)
	isError: function(arg) { return factory.type(arg) == "error" },

	// .isArray(arg)
	isArray: function(arg) { return factory.type(arg) == "array" },

	// .isNumber(arg)
	isNumber: function(arg) { return factory.type(arg) == "number" },

	// .isString(arg)
	isString: function(arg) { return factory.type(arg) == "string" },

	// .isObject(arg)
	isObject: function(arg) { return factory.type(arg) == "object" },

	// .isRegExp(arg)
	isRegExp: function(arg) { return factory.type(arg) == "regexp" },

	// .isBoolean(arg)
	isBoolean: function(arg) { return factory.type(arg) == "boolean" },

	// .isFunction(arg)
	isFunction: function(arg) { return factory.type(arg) == "function" },

	// .isArguments(arg)
	isArguments: function(arg) { return factory.type(arg) == "arguments" },

});

// - -------------------------------------------------------------------- - //

factory.extend({

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
