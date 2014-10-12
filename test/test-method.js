/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/
// - -------------------------------------------------------------------- - //

var factory = require("../");
var assert = require("assert");

// - -------------------------------------------------------------------- - //

describe("Factory.Method",function() {

  // @method
  it("method",function() {
    var method = factory.method({
      0: "return 'zero arguments'",
      5: "return 'five arguments'",
      f: "return 'function'",
      o: "return 'object'",
      a: "return 'array'",
      d: "return 'date'",
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
    assert.deepEqual(method({}),"object");
    assert.deepEqual(method(function() {}),"function");
    assert.deepEqual(method([]),"array");
    assert.deepEqual(method(new Date()),"date");
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
    assert.throws(function() { method([],[],[],[]) },ReferenceError);
  });

});

// - -------------------------------------------------------------------- - //
