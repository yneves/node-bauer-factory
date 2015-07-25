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

describe("factory.merge",function() {

  it("merge",function() {
    
    var merged = factory.merge({
      one: 1,
      two: 2,
      three: 3
    },{
      one: 2,
      two: 3,
      three: 4,
      four: 5
    },{
      one: 3,
      two: 4,
      three: 5,
      four: 6,
      five: { one: 1, two: 2 }
    },{
      five: { one: 2, two: 3, three: 4 }
    },{
      five: { four: { one: 1, two: 2} }
    },{
      five: { four: { one: 2, three: 3 }}
    });
    
    assert.deepEqual(merged,{
      one: 1,
      two: 2,
      three: 3,
      four: 5,
      five: {
        one: 1,
        two: 2,
        three: 4,
        four: {
          one: 1,
          two: 2,
          three: 3
        }
      }
    });
    
  });
  
});

// - -------------------------------------------------------------------- - //
