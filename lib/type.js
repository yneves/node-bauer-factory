/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

// - -------------------------------------------------------------------- - //
// - exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

// .type(value)
factory.typeOf = factory.type = function(arg) {
	var type = typeof arg;
	if (type === "object") {
		if (arg === null) {
			type = "null";
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
}

// - -------------------------------------------------------------------- - //

// .isNull(arg)
factory.isNull = function(arg) { return factory.typeOf(arg) === "null" };

// .isDefined(arg)
factory.isDefined = function(arg) { return factory.typeOf(arg) !== "undefined" };

// .isUndefined(arg)
factory.isUndefined = function(arg) { return factory.typeOf(arg) === "undefined" };

// .isDate(arg)
factory.isDate = function(arg) { return factory.typeOf(arg) === "date" };

// .isError(arg)
factory.isError = function(arg) { return factory.typeOf(arg) === "error" };

// .isArray(arg)
factory.isArray = function(arg) { return factory.typeOf(arg) === "array" };

// .isNumber(arg)
factory.isNumber = function(arg) { return factory.typeOf(arg) === "number" };

// .isString(arg)
factory.isString = function(arg) { return factory.typeOf(arg) === "string" };

// .isObject(arg)
factory.isObject = function(arg) { return factory.typeOf(arg) === "object" };

// .isRegExp(arg)
factory.isRegExp = function(arg) { return factory.typeOf(arg) === "regexp" };

// .isBoolean(arg)
factory.isBoolean = function(arg) { return factory.typeOf(arg) === "boolean" };

// .isFunction(arg)
factory.isFunction = function(arg) { return factory.typeOf(arg) === "function" };

// .isArguments(arg)
factory.isArguments = function(arg) { return factory.typeOf(arg) === "arguments" };

// - -------------------------------------------------------------------- - //

// .ifNull(arg)
factory.ifNull = function(arg,other) { return factory.typeOf(arg) === "null" ? arg : other };

// .ifDefined(arg)
factory.ifDefined = function(arg) { return factory.typeOf(arg) !== "undefined" ? arg : other };

// .ifUndefined(arg)
factory.ifUndefined = function(arg) { return factory.typeOf(arg) === "undefined" ? arg : other };

// .ifDate(arg)
factory.ifDate = function(arg) { return factory.typeOf(arg) === "date" ? arg : other };

// .ifError(arg)
factory.ifError = function(arg) { return factory.typeOf(arg) === "error" ? arg : other };

// .ifArray(arg)
factory.ifArray = function(arg) { return factory.typeOf(arg) === "array" ? arg : other };

// .ifNumber(arg)
factory.ifNumber = function(arg) { return factory.typeOf(arg) === "number" ? arg : other };

// .ifString(arg)
factory.ifString = function(arg) { return factory.typeOf(arg) === "string" ? arg : other };

// .ifObject(arg)
factory.ifObject = function(arg) { return factory.typeOf(arg) === "object" ? arg : other };

// .ifRegExp(arg)
factory.ifRegExp = function(arg) { return factory.typeOf(arg) === "regexp" ? arg : other };

// .ifBoolean(arg)
factory.ifBoolean = function(arg) { return factory.typeOf(arg) === "boolean" ? arg : other };

// .ifFunction(arg)
factory.ifFunction = function(arg) { return factory.typeOf(arg) === "function" ? arg : other };

// .ifArguments(arg)
factory.ifArguments = function(arg) { return factory.typeOf(arg) === "arguments" ? arg : other };

// - -------------------------------------------------------------------- - //
