/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/
// - -------------------------------------------------------------------- - //
// - libs

var lib = {
	factory: require("../"),
};

var assert = require("assert");

// - -------------------------------------------------------------------- - //
// - Factory

describe("Factory",function() {

	// @type
	it("type",function() {

	assert.strictEqual(lib.factory.type(new String("string")),"string");

		assert.strictEqual(lib.factory.type("string"),"string");
		assert.strictEqual(lib.factory.type(123),"number");
		assert.strictEqual(lib.factory.type(new RegExp("\w")),"regexp");
		assert.strictEqual(lib.factory.type(/\w/),"regexp");
		assert.strictEqual(lib.factory.type(new Date()),"date");
		assert.strictEqual(lib.factory.type([1,2,3]),"array");
		assert.strictEqual(lib.factory.type(arguments),"arguments");
		assert.strictEqual(lib.factory.type(true),"boolean");
		assert.strictEqual(lib.factory.type(false),"boolean");
		assert.strictEqual(lib.factory.type(),"undefined");
		assert.strictEqual(lib.factory.type(null),"undefined");
		assert.strictEqual(lib.factory.type(new Object()),"object");
		assert.strictEqual(lib.factory.type({a:"b",b:function(){},c:[]}),"object");
		assert.strictEqual(lib.factory.type(function(){}),"function");
		assert.strictEqual(lib.factory.type(new Error()),"error");
	});

	// @isString
	it("isString",function() {
		assert.strictEqual(lib.factory.isString("string"),true);
		assert.strictEqual(lib.factory.isString(123),false);
		assert.strictEqual(lib.factory.isString(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isString(/\w/),false);
		assert.strictEqual(lib.factory.isString(new Date()),false);
		assert.strictEqual(lib.factory.isString([1,2,3]),false);
		assert.strictEqual(lib.factory.isString(arguments),false);
		assert.strictEqual(lib.factory.isString(true),false);
		assert.strictEqual(lib.factory.isString(false),false);
		assert.strictEqual(lib.factory.isString(),false);
		assert.strictEqual(lib.factory.isString(null),false);
		assert.strictEqual(lib.factory.isString(new Object()),false);
		assert.strictEqual(lib.factory.isString({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isString(function(){}),false);
		assert.strictEqual(lib.factory.isString(new Error("error")),false);
	});

	// @isNumber
	it("isNumber",function() {
		assert.strictEqual(lib.factory.isNumber("string"),false);
		assert.strictEqual(lib.factory.isNumber(123),true);
		assert.strictEqual(lib.factory.isNumber(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isNumber(/\w/),false);
		assert.strictEqual(lib.factory.isNumber(new Date()),false);
		assert.strictEqual(lib.factory.isNumber([1,2,3]),false);
		assert.strictEqual(lib.factory.isNumber(arguments),false);
		assert.strictEqual(lib.factory.isNumber(true),false);
		assert.strictEqual(lib.factory.isNumber(false),false);
		assert.strictEqual(lib.factory.isNumber(),false);
		assert.strictEqual(lib.factory.isNumber(null),false);
		assert.strictEqual(lib.factory.isNumber(new Object()),false);
		assert.strictEqual(lib.factory.isNumber({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isNumber(function(){}),false);
		assert.strictEqual(lib.factory.isNumber(new Error("error")),false);
	});

	// @isObject
	it("isObject",function() {
		assert.strictEqual(lib.factory.isObject("string"),false);
		assert.strictEqual(lib.factory.isObject(123),false);
		assert.strictEqual(lib.factory.isObject(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isObject(/\w/),false);
		assert.strictEqual(lib.factory.isObject(new Date()),false);
		assert.strictEqual(lib.factory.isObject([1,2,3]),false);
		assert.strictEqual(lib.factory.isObject(arguments),false);
		assert.strictEqual(lib.factory.isObject(true),false);
		assert.strictEqual(lib.factory.isObject(false),false);
		assert.strictEqual(lib.factory.isObject(),false);
		assert.strictEqual(lib.factory.isObject(null),false);
		assert.strictEqual(lib.factory.isObject(new Object()),true);
		assert.strictEqual(lib.factory.isObject({a:"b",b:function(){},c:[]}),true);
		assert.strictEqual(lib.factory.isObject(function(){}),false);
		assert.strictEqual(lib.factory.isObject(new Error("error")),false);
	});

	// @isFunction
	it("isFunction",function() {
		assert.strictEqual(lib.factory.isFunction("string"),false);
		assert.strictEqual(lib.factory.isFunction(123),false);
		assert.strictEqual(lib.factory.isFunction(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isFunction(/\w/),false);
		assert.strictEqual(lib.factory.isFunction(new Date()),false);
		assert.strictEqual(lib.factory.isFunction([1,2,3]),false);
		assert.strictEqual(lib.factory.isFunction(arguments),false);
		assert.strictEqual(lib.factory.isFunction(true),false);
		assert.strictEqual(lib.factory.isFunction(false),false);
		assert.strictEqual(lib.factory.isFunction(),false);
		assert.strictEqual(lib.factory.isFunction(null),false);
		assert.strictEqual(lib.factory.isFunction(new Object()),false);
		assert.strictEqual(lib.factory.isFunction({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isFunction(function(){}),true);
		assert.strictEqual(lib.factory.isFunction(new Error("error")),false);
	});

	// @isRegExp
	it("isRegExp",function() {
		assert.strictEqual(lib.factory.isRegExp("string"),false);
		assert.strictEqual(lib.factory.isRegExp(123),false);
		assert.strictEqual(lib.factory.isRegExp(new RegExp("\w")),true);
		assert.strictEqual(lib.factory.isRegExp(/\w/),true);
		assert.strictEqual(lib.factory.isRegExp(new Date()),false);
		assert.strictEqual(lib.factory.isRegExp([1,2,3]),false);
		assert.strictEqual(lib.factory.isRegExp(arguments),false);
		assert.strictEqual(lib.factory.isRegExp(true),false);
		assert.strictEqual(lib.factory.isRegExp(false),false);
		assert.strictEqual(lib.factory.isRegExp(),false);
		assert.strictEqual(lib.factory.isRegExp(null),false);
		assert.strictEqual(lib.factory.isRegExp(new Object()),false);
		assert.strictEqual(lib.factory.isRegExp({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isRegExp(function(){}),false);
		assert.strictEqual(lib.factory.isRegExp(new Error("error")),false);
	});

	// @isArray
	it("isArray",function() {
		assert.strictEqual(lib.factory.isArray("string"),false);
		assert.strictEqual(lib.factory.isArray(123),false);
		assert.strictEqual(lib.factory.isArray(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isArray(/\w/),false);
		assert.strictEqual(lib.factory.isArray(new Date()),false);
		assert.strictEqual(lib.factory.isArray([1,2,3]),true);
		assert.strictEqual(lib.factory.isArray(arguments),false);
		assert.strictEqual(lib.factory.isArray(true),false);
		assert.strictEqual(lib.factory.isArray(false),false);
		assert.strictEqual(lib.factory.isArray(),false);
		assert.strictEqual(lib.factory.isArray(null),false);
		assert.strictEqual(lib.factory.isArray(new Object()),false);
		assert.strictEqual(lib.factory.isArray({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isArray(function(){}),false);
		assert.strictEqual(lib.factory.isArray(new Error("error")),false);
	});

	// @isDate
	it("isDate",function() {
		assert.strictEqual(lib.factory.isDate("string"),false);
		assert.strictEqual(lib.factory.isDate(123),false);
		assert.strictEqual(lib.factory.isDate(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isDate(/\w/),false);
		assert.strictEqual(lib.factory.isDate(new Date()),true);
		assert.strictEqual(lib.factory.isDate([1,2,3]),false);
		assert.strictEqual(lib.factory.isDate(arguments),false);
		assert.strictEqual(lib.factory.isDate(true),false);
		assert.strictEqual(lib.factory.isDate(false),false);
		assert.strictEqual(lib.factory.isDate(),false);
		assert.strictEqual(lib.factory.isDate(null),false);
		assert.strictEqual(lib.factory.isDate(new Object()),false);
		assert.strictEqual(lib.factory.isDate({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isDate(function(){}),false);
		assert.strictEqual(lib.factory.isDate(new Error("error")),false);
	});

	// @isBoolean
	it("isBoolean",function() {
		assert.strictEqual(lib.factory.isBoolean("string"),false);
		assert.strictEqual(lib.factory.isBoolean(123),false);
		assert.strictEqual(lib.factory.isBoolean(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isBoolean(/\w/),false);
		assert.strictEqual(lib.factory.isBoolean(new Date()),false);
		assert.strictEqual(lib.factory.isBoolean([1,2,3]),false);
		assert.strictEqual(lib.factory.isBoolean(arguments),false);
		assert.strictEqual(lib.factory.isBoolean(true),true);
		assert.strictEqual(lib.factory.isBoolean(false),true);
		assert.strictEqual(lib.factory.isBoolean(),false);
		assert.strictEqual(lib.factory.isBoolean(null),false);
		assert.strictEqual(lib.factory.isBoolean(new Object()),false);
		assert.strictEqual(lib.factory.isBoolean({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isBoolean(function(){}),false);
		assert.strictEqual(lib.factory.isBoolean(new Error("error")),false);
	});

	// @isArguments
	it("isArguments",function() {
		assert.strictEqual(lib.factory.isArguments("string"),false);
		assert.strictEqual(lib.factory.isArguments(123),false);
		assert.strictEqual(lib.factory.isArguments(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isArguments(/\w/),false);
		assert.strictEqual(lib.factory.isArguments(new Date()),false);
		assert.strictEqual(lib.factory.isArguments([1,2,3]),false);
		assert.strictEqual(lib.factory.isArguments(arguments),true);
		assert.strictEqual(lib.factory.isArguments(true),false);
		assert.strictEqual(lib.factory.isArguments(false),false);
		assert.strictEqual(lib.factory.isArguments(),false);
		assert.strictEqual(lib.factory.isArguments(null),false);
		assert.strictEqual(lib.factory.isArguments(new Object()),false);
		assert.strictEqual(lib.factory.isArguments({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isArguments(function(){}),false);
		assert.strictEqual(lib.factory.isArguments(new Error("error")),false);
	});

	// @isNull
	it("isNull",function() {
		assert.strictEqual(lib.factory.isNull("string"),false);
		assert.strictEqual(lib.factory.isNull(123),false);
		assert.strictEqual(lib.factory.isNull(new RegExp("\w")),false);
		assert.strictEqual(lib.factory.isNull(/\w/),false);
		assert.strictEqual(lib.factory.isNull(new Date()),false);
		assert.strictEqual(lib.factory.isNull([1,2,3]),false);
		assert.strictEqual(lib.factory.isNull(arguments),false);
		assert.strictEqual(lib.factory.isNull(true),false);
		assert.strictEqual(lib.factory.isNull(false),false);
		assert.strictEqual(lib.factory.isNull(),true);
		assert.strictEqual(lib.factory.isNull(null),true);
		assert.strictEqual(lib.factory.isNull(new Object()),false);
		assert.strictEqual(lib.factory.isNull({a:"b",b:function(){},c:[]}),false);
		assert.strictEqual(lib.factory.isNull(function(){}),false);
		assert.strictEqual(lib.factory.isNull(new Error("error")),false);
	});

	// @toArray
	it("toArray",function() {
		assert.throws(function() { lib.factory.toArray() });
		assert.deepEqual(lib.factory.toArray(function(a,b) {}),[]);
		assert.deepEqual(lib.factory.toArray(true),[]);
		assert.deepEqual(lib.factory.toArray("ab"),["a","b"]);
		assert.deepEqual(lib.factory.toArray({ 0: "a", 1: "b", length: 2 }),["a","b"]);
		assert.notDeepEqual(lib.factory.toArray({ 0: "a", 1: "b" }),["a","b"]);
		assert.deepEqual(lib.factory.toArray(arguments),[]);
		assert.notStrictEqual(lib.factory.toArray(arguments),[]);
	});

	// @method
	it("method",function() {
		var method = lib.factory.method({
			0: "return 'zero arguments'",
			5: "return 'five arguments'",
			s: "return s",
			ss: "return [s0,s1]",
			n: "return n * 10",
			nn: "return n0 - n1",
			b: "return !b",
			bb: "return b0 && b1",
			3: {
				aaa: function(a0,a1,a2) {
					var a = [];
					a0.forEach(function(e) { a.push(e) });
					a1.forEach(function(e) { a.push(e) });
					a2.forEach(function(e) { a.push(e) });
					return a;
				},
				ooo: function(o0,o1,o2) {
					var a = [];
					Object.keys(o0).forEach(function(e) { a.push(e) });
					Object.keys(o1).forEach(function(e) { a.push(e) });
					Object.keys(o2).forEach(function(e) { a.push(e) });
					return a;
				},
				sfr: function(str,fn,re) {
					return str.replace(re,fn);
				},
			},
		});
		assert.deepEqual(method(),"zero arguments");
		assert.deepEqual(method(null,1,"a",{},[]),"five arguments");
		assert.deepEqual(method("string"),"string");
		assert.deepEqual(method("string","string"),["string","string"]);
		assert.deepEqual(method(10),100);
		assert.deepEqual(method(10,5),5);
		assert.deepEqual(method(true),false);
		assert.deepEqual(method(true,false),false);
		assert.deepEqual(method(true,true),true);
		assert.deepEqual(method(["a","b"],["c"],["d","e"]),["a","b","c","d","e"]);
		assert.deepEqual(method({a:"",b:""},{c:""},{d:"",e:""}),["a","b","c","d","e"]);
		assert.deepEqual(method("string",function(ch){return ch.charCodeAt(0)},/s|t/g),"115116ring");
		assert.throws(function() { method([]) },ReferenceError);
	});

	// @class
	it("class",function() {
		var cls = lib.factory.class({
			inherits: "events.EventEmitter",
			constructor: function(a,b) {
				this._a = a;
				this._b = b;
			},
			one: function() { return this._a },
			two: function() { return this._b },
			method: {
				s: "return s",
				n: "return n * n",
			},
		});
		assert.deepEqual(lib.factory.isFunction(cls),true);
		assert.deepEqual(lib.factory.isObject(cls.prototype),true);
		assert.deepEqual(lib.factory.isFunction(cls.prototype.one),true);
		assert.deepEqual(lib.factory.isFunction(cls.prototype.two),true);
		assert.deepEqual(lib.factory.isFunction(cls.prototype.method),true);
		assert.deepEqual(Object.keys(cls.prototype),["one","two","method"]);
		var obj = new cls(1,2);
		assert.deepEqual(obj,{ _a: 1, _b: 2, domain: null, _events: {}, _maxListeners: 10 });
		assert.deepEqual(obj.one(),1);
		assert.deepEqual(obj.two(),2);
		assert.deepEqual(obj.method("string"),"string");
		assert.deepEqual(obj.method(10),100);
	});

	// @object
	it("object",function() {
		var obj = lib.factory.object({
			inherits: "events.EventEmitter",
			constructor: function() {
				this._a = 1;
				this._b = 2;
			},
			one: function() { return this._a },
			two: function() { return this._b },
			method: {
				s: "return s",
				n: "return n * n",
			},
		});
		assert.deepEqual(obj,{ _a: 1, _b: 2, domain: null, _events: {}, _maxListeners: 10 });
		assert.deepEqual(obj.one(),1);
		assert.deepEqual(obj.two(),2);
		assert.deepEqual(obj.method("string"),"string");
		assert.deepEqual(obj.method(10),100);
	});

	// @extend-factory
	it("extend-factory",function() {
		lib.factory.extend({
			one: function() { return 1 },
			two: function() { return 2 },
			sig: {
				s: "return s",
				n: "return n * n",
			},
		});
		assert.deepEqual(lib.factory.isFunction(lib.factory.one),true);
		assert.deepEqual(lib.factory.isFunction(lib.factory.two),true);
		assert.deepEqual(lib.factory.isFunction(lib.factory.sig),true);
		assert.deepEqual(lib.factory.one(),1);
		assert.deepEqual(lib.factory.two(),2);
		assert.deepEqual(lib.factory.sig("string"),"string");
		assert.deepEqual(lib.factory.sig(10),100);
	});

	// @extend-class
	it("extend-class",function() {
		var cls = lib.factory.class({
			inherits: "events.EventEmitter",
			constructor: function(a,b) {
				this._a = a;
				this._b = b;
			},
		});
		lib.factory.extend(cls,{
			one: function() { return 1 },
			two: function() { return 2 },
			method: {
				s: "return s",
				n: "return n * n",
			},
		});
		assert.deepEqual(lib.factory.isFunction(cls),true);
		assert.deepEqual(lib.factory.isObject(cls.prototype),true);
		assert.deepEqual(lib.factory.isFunction(cls.prototype.one),true);
		assert.deepEqual(lib.factory.isFunction(cls.prototype.two),true);
		assert.deepEqual(lib.factory.isFunction(cls.prototype.method),true);
		assert.deepEqual(Object.keys(cls.prototype),["one","two","method"]);
		var obj = new cls(1,2);
		assert.deepEqual(obj,{ _a: 1, _b: 2, domain: null, _events: {}, _maxListeners: 10 });
		assert.deepEqual(obj.one(),1);
		assert.deepEqual(obj.two(),2);
		assert.deepEqual(obj.method("string"),"string");
		assert.deepEqual(obj.method(10),100);
	});

	// @extend-object
	it("extend-object",function() {
		var obj = lib.factory.extend({a:1},{b:2,c:3});
		assert.deepEqual(obj,{a:1,b:2,c:3});
		lib.factory.extend(obj,{a:2});
		assert.deepEqual(obj,{a:2,b:2,c:3});
		lib.factory.extend(obj,{a:null},{b:null},{c:null});
		assert.deepEqual(obj,{a:null,b:null,c:null});
	});

	// @clone-array
	it("clone-array",function() {
		var arr = ["a","b","c",[1,2,3],{a:1,b:2}];
		var clone = lib.factory.clone(arr);
		assert.deepEqual(clone,arr);
		assert.notStrictEqual(clone,arr);
	});

	// @clone-object
	it("clone-object",function() {
		var obj = {a:1,b:2,c:["a","b","c"]};
		var clone = lib.factory.clone(obj);
		assert.deepEqual(clone,obj);
		assert.notStrictEqual(clone,obj);
	});

	// @method-error
	it("method-error",function() {
		var error = new Error("testing factory");
		var method = lib.factory.method(error);
		assert.throws(method,/testing factory/);
	});

	// @guid
	it("guid",function() {
		var repeat = 0;
		var unique = {};
		for (var i = 0; i < 100000; i++) {
			var guid = lib.factory.guid();
			assert.ok(/[a-z0-9]{32}/.test(guid));
			if (unique[guid]) {
				repeat++;
			} else {
				unique[guid] = true;
			}
		}
		assert.equal(repeat,0);
	});


});

// - -------------------------------------------------------------------- - //
