/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

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
