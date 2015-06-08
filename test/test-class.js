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

describe("factory.class",function() {

  it("class",function() {
    var cls = factory.class({
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

  it("object",function() {
    var obj = factory.object({
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

});

// - -------------------------------------------------------------------- - //
