/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

// - -------------------------------------------------------------------- - //
// - Libs

var lib = {
  class: require("./class.js"),
  method: require("./method.js"),
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

// new Class(name,options)
var Class = lib.class.cls.Class;

factory.createError = factory.error = lib.method.createMethod({

  // .createError(name)
  s: function(name) {
    var cls = new Class(name,{
      inherits: Error,
      constructor: function(message) {
        this.name = name;
        this.message = message;
      },
    });
    return cls.toFunction();
  },

  // .createError(options)
  o: function(options) {
    var cls = new Class(null,options);
    cls.inherit(Error);
    return cls.toFunction();
  },

  // .createError(name,options)
  so: function(name,options) {
    var cls = new Class(name,options);
    var custom = new Class("CustomError",{
      inherits: Error,
      constructor: function(message) {
        this.name = name;
        this.message = message;
      },
    })
    cls.inherit(custom);
    return cls.toFunction();
  },

});

// - -------------------------------------------------------------------- - //
