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

factory.extend = lib.method.createMethod({

  // .extend(factory)
  o: function(methods) {
    var keys = Object.keys(methods);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      var key = keys[i];
      this[key] = lib.method.createMethod(methods[key]);
    }
    return factory;
  },

  // .extend(class,methods)
  fo: function(cls,methods) {
    var keys = Object.keys(methods);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      var key = keys[i];
      cls.prototype[key] = lib.method.createMethod(methods[key]);
    }
    return cls;
  },

  // .extend(target,source)
  oo: function(target,source) {
    var keys = Object.keys(source);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      var key = keys[i];
      target[key] = source[key];
    }
    return target;
  },

  // .extend(arg0, arg1, ...)
  _: function() {
    var target = arguments[0];
    var type = lib.type.typeOf(target);
    if (type === "object") {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        var srctype = lib.type.typeOf(source);
        if (srctype === "object") {
          var keys = Object.keys(source);
          var len = keys.length;
          for (var a = 0; a < len; a++) {
            var key = keys[a];
            target[key] = source[key];
          }
        }
      }
    } else if (type == "function") {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        var srctype = lib.type.typeOf(source);
        if (srctype === "object") {
          var keys = Object.keys(source);
          var len = keys.length;
          for (var a = 0; a < len; a++) {
            var key = keys[a];
            target.prototype[key] = lib.method.createMethod(source[key]);
          }
        }
      }
    }
    return target;
  },

});

// - -------------------------------------------------------------------- - //
