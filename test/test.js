/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/
// - -------------------------------------------------------------------- - //
// - Libs

var factory = require("../");
var assert = require("assert");

// - -------------------------------------------------------------------- - //
// - Tests

describe("factory",function() {

	// @toArray
	it("toArray",function() {
		assert.throws(function() { factory.toArray() });
		assert.deepEqual(factory.toArray(function(a,b) {}),[]);
		assert.deepEqual(factory.toArray(true),[]);
		assert.deepEqual(factory.toArray("ab"),["a","b"]);
		assert.deepEqual(factory.toArray({ 0: "a", 1: "b", length: 2 }),["a","b"]);
		assert.notDeepEqual(factory.toArray({ 0: "a", 1: "b" }),["a","b"]);
		assert.deepEqual(factory.toArray(arguments),[]);
		assert.notStrictEqual(factory.toArray(arguments),[]);
	});

	// // @method-embed
	// it("method-embed",function() {
	// 	var method = factory.method({
	// 		0: "return 'zero arguments'",
	// 		5: "return 'five arguments'",
	// 		s: "return s",
	// 		ss: "return [s0,s1]",
	// 		n: "return n * 10",
	// 		nn: "return n0 - n1",
	// 		b: "return !b",
	// 		bb: "return b0 && b1",
	// 		aaa: function(a0,a1,a2) {
	// 			var a = [];
	// 			a0.forEach(function(e) { a.push(e) });
	// 			a1.forEach(function(e) { a.push(e) });
	// 			a2.forEach(function(e) { a.push(e) });
	// 			return a;
	// 		},
	// 		ooo: function(o0,o1,o2) {
	// 			var a = [];
	// 			Object.keys(o0).forEach(function(e) { a.push(e) });
	// 			Object.keys(o1).forEach(function(e) { a.push(e) });
	// 			Object.keys(o2).forEach(function(e) { a.push(e) });
	// 			return a;
	// 		},
	// 		sfr: function(str,fn,re) {
	// 			return str.replace(re,fn);
	// 		},
	// 	},true);
	// 	assert.deepEqual(method(),"zero arguments");
	// 	assert.deepEqual(method(null,1,"a",{},[]),"five arguments");
	// 	assert.deepEqual(method("string"),"string");
	// 	assert.deepEqual(method("string","string"),["string","string"]);
	// 	assert.deepEqual(method(10),100);
	// 	assert.deepEqual(method(10,5),5);
	// 	assert.deepEqual(method(true),false);
	// 	assert.deepEqual(method(true,false),false);
	// 	assert.deepEqual(method(true,true),true);
	// 	assert.deepEqual(method(["a","b"],["c"],["d","e"]),["a","b","c","d","e"]);
	// 	assert.deepEqual(method({a:"",b:""},{c:""},{d:"",e:""}),["a","b","c","d","e"]);
	// 	assert.deepEqual(method("string",function(ch){return ch.charCodeAt(0)},/s|t/g),"115116ring");
	// 	assert.throws(function() { method([]) },ReferenceError);
	// });

	// @extend-factory
	it("extend-factory",function() {
		factory.extend({
			one: function() { return 1 },
			two: function() { return 2 },
			sig: {
				s: "return s",
				n: "return n * n",
			},
		});
		assert.deepEqual(factory.isFunction(factory.one),true);
		assert.deepEqual(factory.isFunction(factory.two),true);
		assert.deepEqual(factory.isFunction(factory.sig),true);
		assert.deepEqual(factory.one(),1);
		assert.deepEqual(factory.two(),2);
		assert.deepEqual(factory.sig("string"),"string");
		assert.deepEqual(factory.sig(10),100);
	});

	// @extend-class
	it("extend-class",function() {
		var cls = factory.class({
			inherits: "events.EventEmitter",
			constructor: function(a,b) {
				this._a = a;
				this._b = b;
			},
		});
		factory.extend(cls,{
			one: function() { return 1 },
			two: function() { return 2 },
			method: {
				s: "return s",
				n: "return n * n",
			},
		});
		assert.deepEqual(factory.isFunction(cls),true);
		assert.deepEqual(factory.isObject(cls.prototype),true);
		assert.deepEqual(factory.isFunction(cls.prototype.one),true);
		assert.deepEqual(factory.isFunction(cls.prototype.two),true);
		assert.deepEqual(factory.isFunction(cls.prototype.method),true);
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
		var obj = factory.extend({a:1},{b:2,c:3});
		assert.deepEqual(obj,{a:1,b:2,c:3});
		factory.extend(obj,{a:2});
		assert.deepEqual(obj,{a:2,b:2,c:3});
		factory.extend(obj,{a:null},{b:null},{c:null});
		assert.deepEqual(obj,{a:null,b:null,c:null});
	});

	// @clone-array
	it("clone-array",function() {
		var arr = ["a","b","c",[1,2,3],{a:1,b:2}];
		var clone = factory.clone(arr);
		assert.deepEqual(clone,arr);
		assert.notStrictEqual(clone,arr);
	});

	// @clone-object
	it("clone-object",function() {
		var obj = {a:1,b:2,c:["a","b","c"]};
		var clone = factory.clone(obj);
		assert.deepEqual(clone,obj);
		assert.notStrictEqual(clone,obj);
	});

	// @method-error
	it("method-error",function() {
		var error = new Error("testing factory");
		var method = factory.method(error);
		assert.throws(method,/testing factory/);
	});

	// @guid
	it("guid",function() {
		var repeat = 0;
		var unique = {};
		for (var i = 0; i < 10; i++) {
			var guid = factory.guid();
			assert.ok(/[a-z0-9]{32}/.test(guid));
			if (unique[guid]) {
				repeat++;
			} else {
				unique[guid] = true;
			}
		}
		assert.equal(repeat,0);
	});

	// @merge
	it("merge",function() {
		var one = { a: "a", b: "b", c: "c", d: { d1: "d1", d2: "d2" } };
		var two = { b: { b1: "b1", b2: "b2" }, c: "ccc", d: { d1: "d111" } };
		var merged = factory.merge(one,two);
		assert.strictEqual(one,merged);
		assert.deepEqual(one,{
			a: "a",
			b: { b1: "b1", b2: "b2" },
			c: "ccc",
			d: { d1: "d111", d2: "d2" },
		});
	});

	// @merge-multiple
	it("merge-multiple",function() {
		var one = { a: "a", b: "b", c: "c", d: { d1: "d1", d2: "d2" } };
		var two = { b: { b1: "b1", b2: "b2" }, c: "ccc", d: { d1: "d111" } };
		var three = { b: { b2: "b222"}, c: { c1: "c1", c2: "c2" } };
		var merged = factory.merge(one,two,three);
		assert.strictEqual(one,merged);
		assert.deepEqual(one,{
			a: "a",
			b: { b1: "b1", b2: "b222" },
			c: { c1: "c1", c2: "c2" },
			d: { d1: "d111", d2: "d2" },
		});
	});

});

// - -------------------------------------------------------------------- - //
