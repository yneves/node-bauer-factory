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
  assert: require("assert"),
};

// - -------------------------------------------------------------------- - //
// - exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

// Checks if two arguments are equal.
function matchArgs(one,two) {
  var match = false;
  if (one === two) {
    match = true;
  } else if (lib.type.isArray(one) || lib.type.isObject(one)) {
    try {
      lib.assert.deepEqual(one,two);
      match = true;
    } catch(e) {
    }
  } else {
    try {
      lib.assert.strictEqual(one,two);
      match = true;
    } catch(e) {
    }
  }
  return match;
}

// Count how many times stub have been called with passed arguments.
function calledWith() {
  var calledWithCount = 0;
  var args = [];
  var argsLength = arguments.length;
  for (var i = 0; i < argsLength; i++) {
    args[i] = arguments[i];
  }
  var callsLength = this._calls.length;
  CALLS: for (var i = 0; i < callsLength; i++) {
    var match = false;
    var called = this._calls[i];
    var calledLength = called.length;
    if (argsLength === 0 && calledLength === 0) {
      match = true;
    } else {
      ARGS: for (var a = 0; a < argsLength; a++) {
        match = matchArgs(args[a],called[a]);
        if (!match) {
          break ARGS;
        }
      }
    }
    if (match) {
      calledWithCount++;
    }
  }
  return calledWithCount;
}

// Checks if stub have been called one time with passed arguments.
function calledOnceWith() {
  return this.calledWith.apply(this,arguments) === 1;
}

// Checks if stub have been called one time.
function calledOnce() {
  return this._calls.length === 1;
}

// Checks if stub have not been called.
function notCalled() {
  return this._calls.length === 0;
}

// Returns number of times stub have been called.
function called() {
  return this._calls.length;
}

// Defines arguments to be used by stub pass to callbacks when called.
function callbackWith() {
  this._callbackWith = [];
  var length = arguments.length;
  for (var i = 0; i < length; i++) {
    var arg = arguments[i];
    this._callbackWith.push(arg);
  }
  return this;
}

// Defines a value to be returned by stub.
function returns(value) {
  this._returns = value;
  return this;
}

// - -------------------------------------------------------------------- - //

// .stub(value)
factory.createStub = factory.stub = function(opts) {

  var newStub; newStub = function() {
    var args = [];
    var callbacks = [];
    var length = arguments.length;
    for (var i = 0; i < length; i++) {
      var arg = arguments[i];
      args.push(arg);
      if (lib.type.isFunction(arg)) {
        callbacks.push(i);
      }
    }
    newStub._calls.push(args);
    if (newStub._callbackWith instanceof Array) {
      var idx = callbacks.pop();
      if (args[idx]) {
        args[idx].apply(this,newStub._callbackWith);
      }
    }
    return newStub._returns;
  };

  newStub._calls = [];
  if (lib.type.isObject(opts)) {
    newStub._returns = opts.returns;
    newStub._callbackWith = opts.callbackWith;
  }

  // .returns(value)
  newStub.returns = returns.bind(newStub);

  // .callbackWith(...)
  newStub.callbackWith = callbackWith.bind(newStub);

  // .called() : Number
  newStub.called = called.bind(newStub);

  // .notCalled() : Boolean
  newStub.notCalled = notCalled.bind(newStub);

  // .calledOnce() : Boolean
  newStub.calledOnce = calledOnce.bind(newStub);

  // .calledWith(...) : Number
  newStub.calledWith = calledWith.bind(newStub);

  // .calledOnceWith(...) : Boolean
  newStub.calledOnceWith = calledOnceWith.bind(newStub);

  return newStub;
}

// - -------------------------------------------------------------------- - //
