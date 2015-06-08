/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

// - -------------------------------------------------------------------- - //
// - Libs

"use strict";

var lib = {
  type: require("./type.js"),
  method: require("./method.js"),
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

// .resolve(name)
factory.resolve = function(name) {
  var parts = name.split(".");
  var mod;
  while (parts.length > 0) {
    var part = parts.shift();
    if (mod) {
      mod = mod[part];
    } else {
      mod = require(part);
    }
  }
  return mod;
};

// - -------------------------------------------------------------------- - //

factory.inherits = lib.method.createMethod({

  // .inherits(class,super)
  fa: function(cls,superClass) {
    factory.inherits(cls,superClass[0]);
  },

  // .inherits(class,super)
  fs: function(cls,superClass) {
    superClass = lib.resolve.resolve(superClass);
    factory.inherits(cls,superClass);
  },

  // .inherits(class,super)
  ff: function(cls,superClass) {
    cls.super_ = superClass;
    cls.prototype = Object.create(superClass.prototype,{
      constructor: {
        value: cls,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
  },

});

// - -------------------------------------------------------------------- - //

factory.super = factory.superOf = lib.method.createMethod({

  // .superOf(class)
  f: function(cls) {
    if (lib.type.isFunction(cls.super_)) {
      return cls.super_;
    }
  },

  // .superOf(class,name)
  fs: function(cls,superName) {
    var superClass = factory.resolve(superName);
    return factory.superOf(cls,superClass);
  },

  // .superOf(class,superClass)
  ff: function(cls,superClass) {
    var super_;
    while (lib.type.isFunction(cls.super_)) {
      if (cls.super_ === superClass) {
        super_ = cls.super_;
        break;
      }
      cls = cls.super_;
    }
    return super_;
  },

});

// - -------------------------------------------------------------------- - //
