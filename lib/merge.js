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

// .merge(arg0, arg1, arg2)
factory.merge = function() {
  var target = {};
  var length = arguments.length;
  var i;
  
  for (i = 0; i < length; i++) {
    merge(target,arguments[i]);
  }
  
  return target;
};

function clone(value) {
  var type = lib.type.type(value);
  if (type === "array") {
    return value.map(function(v) {
      return clone(v);
    });
  } else {
    return value;
  }
}

function merge(target,source) {
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
          merge(target[key],value);
        }
      } else if (isUndef) {
        target[key] = clone(value);
      }
    }
  }
}

// - -------------------------------------------------------------------- - //
