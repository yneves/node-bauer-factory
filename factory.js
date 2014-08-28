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

// .type(arg)
factory.type = function(arg) {
	var type = typeof arg;
	if (type == "object") {
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
		} else if (arg && arg.toString && arg.toString() == "[object Arguments]") {
			type = "arguments";
		}
	}
	return type;
};

// - -------------------------------------------------------------------- - //

// .method(signatures);
factory.method = function(signatures) {
	var type = factory.type(signatures);
	if (type == "object") {
		for (var signature in signatures) {
			var stype = factory.type(signatures[signature]);
			if (stype == "string") {
				var args = [];
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
							args.push(arg+""+index[arg]);
							index[arg]++;
						} else {
							args.push(arg);
						}
					});
				}
				args.push(signatures[signature]);
				signatures[signature] = Function.constructor.apply(Function,args);
			} else if (stype != "function") {
				signatures[signature] = factory.method(signatures[signature]);
			}
		}
		return function() {
			var signature = "";
			for (var i = 0; i < arguments.length; i++) {
				var type = factory.type(arguments[i]);
				signature += type.substr(0,1);
			}
			if (signatures[signature]) {
				return signatures[signature].apply(this,arguments);
			} else if (signatures[arguments.length]) {
				return signatures[arguments.length].apply(this,arguments);
			} else if (signatures._) {
				return signatures._.apply(this,arguments);
			} else {
				throw new ReferenceError("signature not found");
			}
		}
	} else if (type == "error") {
		return function() { throw signatures; }
	} else if (type == "function") {
		return signatures;
	} else if (type == "string") {
		return new Function(signatures);
	} else if (type == "undefined") {
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
