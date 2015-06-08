/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

// - -------------------------------------------------------------------- - //
// - Libs

"use strict";

var modules = [
  require("./type.js"),
  require("./method.js"),
  require("./inherits.js"),
  require("./class.js"),
  require("./error.js")
];

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

modules.forEach(function(mod) {
  var keys = Object.keys(mod);
  var length = keys.length;
  for (var i = 0; i < length; i++) {
    var key = keys[i];
    if (key !== "cls") {
      factory[key] = mod[key];
    }
  }
});

// - -------------------------------------------------------------------- - //
