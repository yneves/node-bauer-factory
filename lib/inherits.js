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
  resolve: require("./resolve.js"),
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

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
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },

});

// - -------------------------------------------------------------------- - //
