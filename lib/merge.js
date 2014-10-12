/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

// - -------------------------------------------------------------------- - //
// - Libs

var lib = {
  type: require("./type.js"),
  method: require("./method.js"),
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

factory.merge = lib.method.createMethod({

  // .merge(target,source)
  oo: function(target,source) {
    var keys = Object.keys(source);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      var key = keys[i];
      if (lib.type.isObject(source[key])) {
        if (!lib.type.isObject(target[key])) {
          target[key] = {};
        }
        factory.merge(target[key],source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  },

  // .merge(arg0, arg1, ...)
  _: function() {
    var target = arguments[0];
    var type = lib.type.typeOf(target);
    if (type === "object") {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        var srctype = lib.type.typeOf(source);
        if (srctype === "object") {
          factory.merge(target,source);
        }
      }
    }
    return target;
  },

});

// - -------------------------------------------------------------------- - //
