/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/
// - -------------------------------------------------------------------- - //
// - Libs

var factory = require("../");
var assert = require("assert");

// - -------------------------------------------------------------------- - //
// - Tests

describe("factory.error",function() {

  it("error",function() {
    var CustomError = factory.createError("CustomError");
    assert.ok(new CustomError() instanceof Error);
    assert.strictEqual(new CustomError().name,"CustomError");
  });

});

// - -------------------------------------------------------------------- - //
