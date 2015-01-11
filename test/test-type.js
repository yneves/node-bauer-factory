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

describe("factory.type",function() {

  // @type
  it("type",function() {
    assert.strictEqual(factory.type(new String("string")),"string");
    assert.strictEqual(factory.type("string"),"string");
    assert.strictEqual(factory.type(123),"number");
    assert.strictEqual(factory.type(new RegExp("\w")),"regexp");
    assert.strictEqual(factory.type(/\w/),"regexp");
    assert.strictEqual(factory.type(new Date()),"date");
    assert.strictEqual(factory.type([1,2,3]),"array");
    assert.strictEqual(factory.type(arguments),"arguments");
    assert.strictEqual(factory.type(true),"boolean");
    assert.strictEqual(factory.type(false),"boolean");
    assert.strictEqual(factory.type(),"undefined");
    assert.strictEqual(factory.type(null),"null");
    assert.strictEqual(factory.type(new Object()),"object");
    assert.strictEqual(factory.type({a:"b",b:function(){},c:[]}),"object");
    assert.strictEqual(factory.type(function(){}),"function");
    assert.strictEqual(factory.type(new Error()),"error");
  });

  // @isString
  it("isString",function() {
    assert.strictEqual(factory.isString(new String("string")),true);
    assert.strictEqual(factory.isString("string"),true);
    assert.strictEqual(factory.isString(123),false);
    assert.strictEqual(factory.isString(new RegExp("\w")),false);
    assert.strictEqual(factory.isString(/\w/),false);
    assert.strictEqual(factory.isString(new Date()),false);
    assert.strictEqual(factory.isString([1,2,3]),false);
    assert.strictEqual(factory.isString(arguments),false);
    assert.strictEqual(factory.isString(true),false);
    assert.strictEqual(factory.isString(false),false);
    assert.strictEqual(factory.isString(),false);
    assert.strictEqual(factory.isString(null),false);
    assert.strictEqual(factory.isString(new Object()),false);
    assert.strictEqual(factory.isString({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isString(function(){}),false);
    assert.strictEqual(factory.isString(new Error("error")),false);
  });

  // @isNumber
  it("isNumber",function() {
    assert.strictEqual(factory.isNumber("string"),false);
    assert.strictEqual(factory.isNumber(new Number(123)),true);
    assert.strictEqual(factory.isNumber(123),true);
    assert.strictEqual(factory.isNumber(new RegExp("\w")),false);
    assert.strictEqual(factory.isNumber(/\w/),false);
    assert.strictEqual(factory.isNumber(new Date()),false);
    assert.strictEqual(factory.isNumber([1,2,3]),false);
    assert.strictEqual(factory.isNumber(arguments),false);
    assert.strictEqual(factory.isNumber(true),false);
    assert.strictEqual(factory.isNumber(false),false);
    assert.strictEqual(factory.isNumber(),false);
    assert.strictEqual(factory.isNumber(null),false);
    assert.strictEqual(factory.isNumber(new Object()),false);
    assert.strictEqual(factory.isNumber({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isNumber(function(){}),false);
    assert.strictEqual(factory.isNumber(new Error("error")),false);
  });

  // @isObject
  it("isObject",function() {
    assert.strictEqual(factory.isObject("string"),false);
    assert.strictEqual(factory.isObject(123),false);
    assert.strictEqual(factory.isObject(new RegExp("\w")),false);
    assert.strictEqual(factory.isObject(/\w/),false);
    assert.strictEqual(factory.isObject(new Date()),false);
    assert.strictEqual(factory.isObject([1,2,3]),false);
    assert.strictEqual(factory.isObject(arguments),false);
    assert.strictEqual(factory.isObject(true),false);
    assert.strictEqual(factory.isObject(false),false);
    assert.strictEqual(factory.isObject(),false);
    assert.strictEqual(factory.isObject(null),false);
    assert.strictEqual(factory.isObject(new Object()),true);
    assert.strictEqual(factory.isObject({a:"b",b:function(){},c:[]}),true);
    assert.strictEqual(factory.isObject(function(){}),false);
    assert.strictEqual(factory.isObject(new Error("error")),false);
  });

  // @isFunction
  it("isFunction",function() {
    assert.strictEqual(factory.isFunction("string"),false);
    assert.strictEqual(factory.isFunction(123),false);
    assert.strictEqual(factory.isFunction(new RegExp("\w")),false);
    assert.strictEqual(factory.isFunction(/\w/),false);
    assert.strictEqual(factory.isFunction(new Date()),false);
    assert.strictEqual(factory.isFunction([1,2,3]),false);
    assert.strictEqual(factory.isFunction(arguments),false);
    assert.strictEqual(factory.isFunction(true),false);
    assert.strictEqual(factory.isFunction(false),false);
    assert.strictEqual(factory.isFunction(),false);
    assert.strictEqual(factory.isFunction(null),false);
    assert.strictEqual(factory.isFunction(new Object()),false);
    assert.strictEqual(factory.isFunction({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isFunction(function(){}),true);
    assert.strictEqual(factory.isFunction(new Error("error")),false);
  });

  // @isRegExp
  it("isRegExp",function() {
    assert.strictEqual(factory.isRegExp("string"),false);
    assert.strictEqual(factory.isRegExp(123),false);
    assert.strictEqual(factory.isRegExp(new RegExp("\w")),true);
    assert.strictEqual(factory.isRegExp(/\w/),true);
    assert.strictEqual(factory.isRegExp(new Date()),false);
    assert.strictEqual(factory.isRegExp([1,2,3]),false);
    assert.strictEqual(factory.isRegExp(arguments),false);
    assert.strictEqual(factory.isRegExp(true),false);
    assert.strictEqual(factory.isRegExp(false),false);
    assert.strictEqual(factory.isRegExp(),false);
    assert.strictEqual(factory.isRegExp(null),false);
    assert.strictEqual(factory.isRegExp(new Object()),false);
    assert.strictEqual(factory.isRegExp({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isRegExp(function(){}),false);
    assert.strictEqual(factory.isRegExp(new Error("error")),false);
  });

  // @isArray
  it("isArray",function() {
    assert.strictEqual(factory.isArray("string"),false);
    assert.strictEqual(factory.isArray(123),false);
    assert.strictEqual(factory.isArray(new RegExp("\w")),false);
    assert.strictEqual(factory.isArray(/\w/),false);
    assert.strictEqual(factory.isArray(new Date()),false);
    assert.strictEqual(factory.isArray([1,2,3]),true);
    assert.strictEqual(factory.isArray(arguments),false);
    assert.strictEqual(factory.isArray(true),false);
    assert.strictEqual(factory.isArray(false),false);
    assert.strictEqual(factory.isArray(),false);
    assert.strictEqual(factory.isArray(null),false);
    assert.strictEqual(factory.isArray(new Object()),false);
    assert.strictEqual(factory.isArray({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isArray(function(){}),false);
    assert.strictEqual(factory.isArray(new Error("error")),false);
  });

  // @isDate
  it("isDate",function() {
    assert.strictEqual(factory.isDate("string"),false);
    assert.strictEqual(factory.isDate(123),false);
    assert.strictEqual(factory.isDate(new RegExp("\w")),false);
    assert.strictEqual(factory.isDate(/\w/),false);
    assert.strictEqual(factory.isDate(new Date()),true);
    assert.strictEqual(factory.isDate([1,2,3]),false);
    assert.strictEqual(factory.isDate(arguments),false);
    assert.strictEqual(factory.isDate(true),false);
    assert.strictEqual(factory.isDate(false),false);
    assert.strictEqual(factory.isDate(),false);
    assert.strictEqual(factory.isDate(null),false);
    assert.strictEqual(factory.isDate(new Object()),false);
    assert.strictEqual(factory.isDate({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isDate(function(){}),false);
    assert.strictEqual(factory.isDate(new Error("error")),false);
  });

  // @isBoolean
  it("isBoolean",function() {
    assert.strictEqual(factory.isBoolean("string"),false);
    assert.strictEqual(factory.isBoolean(123),false);
    assert.strictEqual(factory.isBoolean(new Boolean()),true);
    assert.strictEqual(factory.isBoolean(new RegExp("\w")),false);
    assert.strictEqual(factory.isBoolean(/\w/),false);
    assert.strictEqual(factory.isBoolean(new Date()),false);
    assert.strictEqual(factory.isBoolean([1,2,3]),false);
    assert.strictEqual(factory.isBoolean(arguments),false);
    assert.strictEqual(factory.isBoolean(true),true);
    assert.strictEqual(factory.isBoolean(false),true);
    assert.strictEqual(factory.isBoolean(),false);
    assert.strictEqual(factory.isBoolean(null),false);
    assert.strictEqual(factory.isBoolean(new Object()),false);
    assert.strictEqual(factory.isBoolean({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isBoolean(function(){}),false);
    assert.strictEqual(factory.isBoolean(new Error("error")),false);
  });

  // @isArguments
  it("isArguments",function() {
    assert.strictEqual(factory.isArguments("string"),false);
    assert.strictEqual(factory.isArguments(123),false);
    assert.strictEqual(factory.isArguments(new RegExp("\w")),false);
    assert.strictEqual(factory.isArguments(/\w/),false);
    assert.strictEqual(factory.isArguments(new Date()),false);
    assert.strictEqual(factory.isArguments([1,2,3]),false);
    assert.strictEqual(factory.isArguments(arguments),true);
    assert.strictEqual(factory.isArguments(true),false);
    assert.strictEqual(factory.isArguments(false),false);
    assert.strictEqual(factory.isArguments(),false);
    assert.strictEqual(factory.isArguments(null),false);
    assert.strictEqual(factory.isArguments(new Object()),false);
    assert.strictEqual(factory.isArguments({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isArguments(function(){}),false);
    assert.strictEqual(factory.isArguments(new Error("error")),false);
  });

  // @isNull
  it("isNull",function() {
    assert.strictEqual(factory.isNull("string"),false);
    assert.strictEqual(factory.isNull(123),false);
    assert.strictEqual(factory.isNull(new RegExp("\w")),false);
    assert.strictEqual(factory.isNull(/\w/),false);
    assert.strictEqual(factory.isNull(new Date()),false);
    assert.strictEqual(factory.isNull([1,2,3]),false);
    assert.strictEqual(factory.isNull(arguments),false);
    assert.strictEqual(factory.isNull(true),false);
    assert.strictEqual(factory.isNull(false),false);
    assert.strictEqual(factory.isNull(),false);
    assert.strictEqual(factory.isNull(null),true);
    assert.strictEqual(factory.isNull(new Object()),false);
    assert.strictEqual(factory.isNull({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isNull(function(){}),false);
    assert.strictEqual(factory.isNull(new Error("error")),false);
  });

  // @isDefined
  it("isDefined",function() {
    assert.strictEqual(factory.isDefined("string"),true);
    assert.strictEqual(factory.isDefined(123),true);
    assert.strictEqual(factory.isDefined(new RegExp("\w")),true);
    assert.strictEqual(factory.isDefined(/\w/),true);
    assert.strictEqual(factory.isDefined(new Date()),true);
    assert.strictEqual(factory.isDefined([1,2,3]),true);
    assert.strictEqual(factory.isDefined(arguments),true);
    assert.strictEqual(factory.isDefined(true),true);
    assert.strictEqual(factory.isDefined(false),true);
    assert.strictEqual(factory.isDefined(),false);
    assert.strictEqual(factory.isDefined(null),true);
    assert.strictEqual(factory.isDefined(new Object()),true);
    assert.strictEqual(factory.isDefined({a:"b",b:function(){},c:[]}),true);
    assert.strictEqual(factory.isDefined(function(){}),true);
    assert.strictEqual(factory.isDefined(new Error("error")),true);
  });

  // @isUndefined
  it("isUndefined",function() {
    assert.strictEqual(factory.isUndefined("string"),false);
    assert.strictEqual(factory.isUndefined(123),false);
    assert.strictEqual(factory.isUndefined(new RegExp("\w")),false);
    assert.strictEqual(factory.isUndefined(/\w/),false);
    assert.strictEqual(factory.isUndefined(new Date()),false);
    assert.strictEqual(factory.isUndefined([1,2,3]),false);
    assert.strictEqual(factory.isUndefined(arguments),false);
    assert.strictEqual(factory.isUndefined(true),false);
    assert.strictEqual(factory.isUndefined(false),false);
    assert.strictEqual(factory.isUndefined(),true);
    assert.strictEqual(factory.isUndefined(null),false);
    assert.strictEqual(factory.isUndefined(new Object()),false);
    assert.strictEqual(factory.isUndefined({a:"b",b:function(){},c:[]}),false);
    assert.strictEqual(factory.isUndefined(function(){}),false);
    assert.strictEqual(factory.isUndefined(new Error("error")),false);
  });

});

// - -------------------------------------------------------------------- - //
