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
  type: require("./type.js"),
  method: require("./method.js"),
  inherits: require("./inherits.js")
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

// new Method(signatures)
var Method = lib.method.cls.Method;

// new Class(options)
function Class(name,options) {

  this.name = name || "";
  this.mixins = [];
  this.methods = {};
  this.properties = {};

  if (lib.type.isObject(options)) {
    var keys = Object.keys(options);
    var length = keys.length;
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      var value = options[key];
      if (key === "constructor") {
        this.addConstructor(value);
      } else if (key === "inherits") {
        this.inherit(value);
      } else if (key === "mixins") {
        this.mixin(value);
      } else {
        this.addMethod(key,value);
      }
    }
  }

}

Class.prototype = {

  // .mixin(prototype)
  mixin: lib.method.createMethod({
    f: "this.mixins.push(f.prototype)",
    o: "this.mixins.push(o)",
  }),

  // .inherit(class)
  inherit: function(cls) {
    this.inherits = cls;
  },

  // .setName(name)
  setName: function(name) {
    this.name = name;
  },

  // .getMethod(name)
  getMethod: function(name) {
    if (!this.methods[name]) {
      this.methods[name] = new Method(name);
    }
    return this.methods[name];
  },

  // .addMethod(name, signatures)
  addMethod: function(name,signatures) {
    this.getMethod(name).addSignature(signatures);
  },

  // .addProperty(name, property)
  addProperty: function(name,property) {
    this.properties[name] = new property();
  },

  // .getConstructor()
  getConstructor: function() {
    if (!this._constructor) {
      this._constructor = new Method(this.name + "_constructor");
    }
    return this._constructor;
  },

  // .addConstructor(signatures)
  addConstructor: function(signatures) {
    this.getConstructor().addSignature(signatures);
  },

  // .toFunction()
  toFunction: function() {
    var constructor;
    if (this._constructor) {
      constructor = this._constructor.toFunction();
    }
    var inherits;
    if (this.inherits) {
      if (lib.type.isString(this.inherits)) {
        inherits = lib.inherits.resolve(this.inherits);
      } else {
        inherits = this.inherits;
      }
    }
    var code = "return function " + this.name + "() {";
    code += "inherits && inherits.apply(this,arguments);";
    code += "constructor && constructor.apply(this,arguments);";
    code += "}";
    var mkcls = new Function("constructor","inherits",code);
    var cls = mkcls(constructor,inherits);
    if (inherits) {
      lib.inherits.inherits(cls,inherits);
    }
    var mixlength = this.mixins.length;
    for (var i = 0; i < mixlength; i++) {
      var mixin = this.mixins[i];
      var names = Object.keys(mixin);
      var nlength = names.length;
      for (var n = 0; n < nlength; n++) {
        var name = names[n];
        cls.prototype[name] = mixin[name];
      }
    }
    var methods = Object.keys(this.methods);
    var metlength = methods.length;
    for (var m = 0; m < metlength; m++) {
      var name = methods[m];
      var method = this.methods[name];
      cls.prototype[name] = method.toFunction();
    }
    return cls;
  },

};

// - -------------------------------------------------------------------- - //

factory.createClass = factory.class = lib.method.createMethod({

  // .createClass(options Object) :Function
  o: function(options) {
    var cls = new Class(null,options);
    return cls.toFunction();
  },

  // .createClass(name String, options Object)
  so: function(name,options) {
    var cls = new Class(name,options);
    return cls.toFunction();
  },

});

factory.extendClass = lib.method.createMethod({
  
  // .extendClass(class Function, methods Object) :void
  fo: function(cls,methods) {
    Object.keys(methods).forEach(function(name) {
      cls.prototype[name] = lib.method.createMethod(methods[name]);
    });
  }

});

// - -------------------------------------------------------------------- - //

factory.createObject = factory.object = lib.method.createMethod({

  // .createObject(options)
  o: function(options) {
    var cls = new Class(null,options);
    cls = cls.toFunction();
    return new cls();
  },

  // .createObject(name,options)
  so: function(name,options) {
    var cls = new Class(name,options);
    cls = cls.toFunction();
    return new cls();
  },

});

// - -------------------------------------------------------------------- - //

factory.cls = { Class: Class };

// - -------------------------------------------------------------------- - //
