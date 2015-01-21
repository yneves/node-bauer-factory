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

describe("factory.eval",function() {

  it("number",function() {
    var evaluator = factory.createEvaluator("a + b + 3");
    var result = evaluator.evaluate({ a: 1, b: 2 });
    assert.strictEqual(result,6);    
  });
  
  it("false",function() {
    var evaluator = factory.createEvaluator("(a == b) || (c == d)");
    var result = evaluator.evaluate({ a: 1, b: 2, c: 3, d: 4 });
    assert.strictEqual(result,false);
  });
  
  it("true",function() {
    var evaluator = factory.createEvaluator("(a == b) || (c == d)");
    var result = evaluator.evaluate({ a: 1, b: 2, c: 3, d: 3 });
    assert.strictEqual(result,true);
  });
  
  it("setVars",function() {
    var evaluator = factory.createEvaluator("(a == b) || (c == d)");
    evaluator.setVars({ c: 3, d: 3 });
    var result = evaluator.evaluate({ a: 1, b: 2 });
    assert.strictEqual(result,true);
  });

});

// - -------------------------------------------------------------------- - //
