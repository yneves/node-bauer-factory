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

describe("factory.property",function() {

  it("property",function() {
    var CustomProperty = factory.createProperty("CustomProperty");
    assert.ok(factory.superOf(CustomProperty,factory.cls.Property));
    var prop = new CustomProperty();
    assert.ok(prop instanceof factory.cls.Property);
  });

  it("defineProperty",function() {
    var obj = {};
    var CustomProperty = factory.createProperty("CustomProperty",{
      set: function(value) { this.value = value * 2 },
    });
    var prop = new CustomProperty();
    Object.defineProperty(obj,"prop",prop);
    obj.prop = 2;
    assert.strictEqual(obj.prop,4);
  });

});

// - -------------------------------------------------------------------- - //
