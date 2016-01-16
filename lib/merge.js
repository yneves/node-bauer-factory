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
  type: require("./type.js")
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

// .clone(value)
factory.clone = function(value) {
  return clone(value);
};

// .merge(arg0, arg1, arg2)
factory.merge = function() {
  var target = {};
  var length = arguments.length;
  var i;
  
  for (i = 0; i < length; i++) {
    merge(target, arguments[i], false);
  }
  
  return target;
};

// .extend(target, arg1, arg2)
factory.extend = function() {
  var target = arguments[0];
  var length = arguments.length;
  var i;
  
  for (i = 1; i < length; i++) {
    merge(target, arguments[i], true);
  }
  
  return target;
};

// - -------------------------------------------------------------------- - //

function clone(value) {
  var type = lib.type.type(value);
  if (type === "array") {
    return value.map(clone);
  } else if (type === "object") {
    var target = {};
    merge(target,value);
    return target;
  } else {
    return value;
  }
}

function merge (target, source, overwrite) {
  var keys;
  var key;
  var value;
  var keysLength;
  var k;
  var isUndef;
  
  if (lib.type.isObject(source)) {
    keys = Object.keys(source);
    keysLength = keys.length;
    for (k = 0; k < keysLength; k++) {
      key = keys[k];
      value = source[key];
      isUndef = lib.type.isUndefined(target[key]);
      if (lib.type.isObject(value)) {
        if (isUndef) {
          target[key] = {};
        }
        if (lib.type.isObject(target[key])) {
          merge(target[key],value, overwrite);
        }
      } else if (isUndef || overwrite) {
        target[key] = clone(value);
      }
    }
  }
}

// - -------------------------------------------------------------------- - //
