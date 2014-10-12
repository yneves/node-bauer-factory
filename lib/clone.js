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
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

factory.clone = lib.method.createMethod({

  // .clone(object)
  o: function(object) {
    var clone = {};
    var keys = Object.keys(object);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      var key = keys[i];
      clone[key] = factory.clone(object[key]);
    }
    return clone;
  },

  // .clone(array)
  a: function(array) {
    var clone = [];
    var len = array.length;
    for (var i = 0; i < len; i++) {
      clone[i] = factory.clone(array[i]);
    }
    return clone;
  },

  // .clone(date)
  d: function(date) {
    return new Date(date.getTime());
  },

  // .clone(arg)
  _: function(arg) {
    return arg;
  },

});

// - -------------------------------------------------------------------- - //
