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

describe("factory.stub",function() {

  it("called",function() {
    var stub = factory.createStub();
    stub();
    assert.strictEqual(stub.called(),1);
    stub();
    assert.strictEqual(stub.called(),2);
    stub();
    assert.strictEqual(stub.called(),3);
    assert.strictEqual(stub.called(),3);
  });

  it("notCalled",function() {
    var stub = factory.createStub();
    assert.ok(stub.notCalled());
    stub();
    assert.ok(!stub.notCalled());
  });

  it("calledOnce",function() {
    var stub = factory.createStub();
    stub();
    assert.ok(stub.calledOnce());
    stub();
    assert.ok(!stub.calledOnce());
  });

  it("calledWith",function() {
    var stub = factory.createStub();
    stub();
    assert.strictEqual(stub.calledWith(),1);
    stub();
    assert.strictEqual(stub.calledWith(),2);
    assert.strictEqual(stub.calledWith(1),0);
    stub(1,2);
    assert.strictEqual(stub.calledWith(1,2),1);
    stub(1,2);
    assert.strictEqual(stub.calledWith(1,2),2);
    assert.strictEqual(stub.calledWith(1,2),2);
    stub(1);
    assert.strictEqual(stub.calledWith(1),3);
    stub("text",1,2);
    assert.strictEqual(stub.calledWith("text",1),1);
    assert.strictEqual(stub.calledWith("text",1,2),1);
    stub("text",2);
    assert.strictEqual(stub.calledWith("text",2),1);
    assert.strictEqual(stub.calledWith("text"),2);
  });

  it("calledOnceWith",function() {
    var stub = factory.createStub();
    stub();
    assert.ok(stub.calledOnceWith());
    stub();
    assert.ok(!stub.calledOnceWith());
    stub(1,2);
    assert.ok(stub.calledOnceWith(1,2));
    stub(1,2);
    assert.ok(!stub.calledOnceWith(1,2));
    stub(1);
    assert.ok(!stub.calledOnceWith(1));
    stub("text",1,2);
    assert.ok(stub.calledOnceWith("text",1));
    assert.ok(stub.calledOnceWith("text",1,2));
    stub("text",2);
    assert.ok(stub.calledOnceWith("text",2));
    assert.ok(!stub.calledOnceWith("text"));
  });

  it("returns",function() {
    var stub = factory.createStub();
    assert.strictEqual(typeof stub(),"undefined");
    stub.returns(null);
    assert.strictEqual(stub(),null);
    stub.returns(1);
    assert.strictEqual(stub(),1);
    stub.returns("text");
    assert.strictEqual(stub(),"text");
    stub.returns([1,2,3]);
    assert.deepEqual(stub(),[1,2,3]);
    stub.returns();
    assert.strictEqual(typeof stub(),"undefined");
  });

  it("callbackWith",function() {
    var stub = factory.createStub();
    stub.callbackWith();
    stub(function() {
      assert.strictEqual(arguments.length,0);
    });
    stub.callbackWith(1,2);
    stub(function(a,b) {
      assert.strictEqual(arguments.length,2);
      assert.deepEqual([a,b],[1,2]);
    });
    stub.callbackWith(new Error("a"));
    stub(function(error) {
      assert.strictEqual(arguments.length,1);
      assert.ok(error instanceof Error);
      assert.strictEqual(error.message,"a");
    });
  });

});

// - -------------------------------------------------------------------- - //
