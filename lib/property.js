/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

// - -------------------------------------------------------------------- - //
// - Libs

var lib = {
  method: require("./method.js"),
  extend: require("./extend.js"),
  inherits: require("./inherits.js"),
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

// new Property()
var Property = function() {};

Property.prototype = {
  name: "Property",
  enumerable: true,
  configurable: true,
  get: function() { return this.value; },
  set: function(value) { this.value = value; },
};

factory.property = factory.createProperty = lib.method.createMethod({

  // .createProperty(name)
  s: function(name) {
    var CustomProperty = lib.method.createMethod(name,function() {});
    lib.inherits.inherits(CustomProperty,Property);
    lib.extend.extend(CustomProperty,{ name: name });
    return CustomProperty;
  },

  // .createProperty(options)
  o: function(options) {
    var CustomProperty = function() {};
    lib.inherits.inherits(CustomProperty,Property);
    lib.extend.extend(CustomProperty,options);
    return CustomProperty;
  },

  // .createProperty(name,options)
  so: function(name,options) {
    var CustomProperty = lib.method.createMethod(name,function() {});
    lib.inherits.inherits(CustomProperty,Property);
    lib.extend.extend(CustomProperty,{ name: name });
    lib.extend.extend(CustomProperty,options);
    return CustomProperty;
  },

});

// - -------------------------------------------------------------------- - //

factory.cls = { Property: Property };

// - -------------------------------------------------------------------- - //
