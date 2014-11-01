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
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

var regExp = {
  number: /^[0-9]+$/,
  letter: /^[a-z]+$/,
  index: /\$index\$/g,
};

var condExpr = {
  f: "typeof arguments[$index$] === 'function'",
  a: "arguments[$index$] instanceof Array",
  b: "(typeof arguments[$index$] === 'boolean' || arguments[$index$] instanceof Boolean)",
  s: "(typeof arguments[$index$] === 'string' || arguments[$index$] instanceof String)",
  n: "(typeof arguments[$index$] === 'number' || arguments[$index$] instanceof Number)",
  d: "arguments[$index$] instanceof Date",
  e: "arguments[$index$] instanceof Error",
  r: "arguments[$index$] instanceof RegExp",
  u: "(arguments[$index$] === null || typeof arguments[$index$] === 'undefined')",
  o: "Object.prototype.toString.call(arguments[$index$]) === '[object Object]'",
};

// - -------------------------------------------------------------------- - //

function parseArgs(signature) {
  var args = [];
  var count = {};
  var index = {};
  var length = signature.length;
  for (var i = 0; i < length; i++) {
    var arg = signature[i];
    if (count[arg]) {
      count[arg]++;
    } else {
      count[arg] = 1;
    }
    index[arg] = 0;
  }
  for (var i = 0; i < length; i++) {
    var arg = signature[i];
    if (count[arg] > 1) {
      args.push(arg + "" + index[arg]);
      index[arg]++;
    } else {
      args.push(arg);
    }
  }
  return args
}

function recurseTree(tree,level) {
  var code = "";
  var keys = Object.keys(tree).sort();
  var length = keys.length;
  for (var i = 0; i < length; i++) {
    var key = keys[i];
    var value = tree[key];
    var type = lib.type.typeOf(value);
    if (type === "object") {
      code += "if (";
      if (regExp.number.test(key)) {
        code += "len === " + key;
      } else if (regExp.letter.test(key)) {
        code += condExpr[key].replace(regExp.index,level);
      }
      code += ") {";
      code += recurseTree(value,level + 1);
      code += "}";
    } else if (type === "number") {
      code += "return functions[" + value + "].apply(this,arguments);";
    }
  }
  return code;
}

// - -------------------------------------------------------------------- - //

// new Method(name)
function Method(name,signatures) {
  this.name = name || "";
  this.tree = {};
  this.functions = [];
  if (lib.type.isObject(signatures)) {
    this.addSignature(signatures);
  }
}

Method.prototype = {

  // .setName(name)
  setName: function(name) {
    this.name = name;
  },

  // .addFunction(function, arguments)
  addFunction: function(func,args) {
    var type = lib.type.typeOf(func);
    if (type === "string") {
      var fargs = [];
      if (args instanceof Array) {
        fargs.push.apply(fargs,args);
      }
      fargs.push(func);
      func = Function.constructor.apply(Function,fargs);
    } else if (type === "error") {
      func = function() { throw func };
    } else if (type === "object") {
      func = new Method(null,func).toFunction();
    } else if (type === "undefined") {
      func = function() {};
    }
    var index = this.functions.length;
    this.functions.push(func);
    return index;
  },

  // .addSignature(function)
  // .addSignature(signatures)
  // .addSignature(signature, function)
  addSignature: function() {
    if (arguments.length === 1) {
      var signatures = arguments[0];
      if (lib.type.isObject(signatures)) {
        var keys = Object.keys(signatures).sort();
        var length = keys.length;
        for (var i = length; i > 0; i--) {
          this.addSignature(keys[i-1],signatures[keys[i-1]]);
        }
      } else if (lib.type.isFunction(signatures)) {
        this.addSignature("_",signatures);
      }
    } else if (arguments.length === 2) {
      var signature = arguments[0];
      var func = arguments[1];
      if (signature === "_") {
        this.tree._ = this.addFunction(func);
      } else if (regExp.number.test(signature)) {
        (this.tree[signature] || (this.tree[signature] = {}))._ = this.addFunction(func);
      } else if (regExp.letter.test(signature)) {
        var length = signature.length;
        var tree = this.tree[length] || (this.tree[length] = {});
        for (var i = 0; i < length; i++) {
          tree = tree[signature[i]] || (tree[signature[i]] = {});
        }
        tree._ = this.addFunction(func,parseArgs(signature));
      }
    }
  },

  // .toFunction()
  toFunction: function() {
    var code = "return function " + this.name + "() {";
    code += "var len = arguments.length;";
    code += recurseTree(this.tree,-1);
    code += "throw new ReferenceError('signature not found');";
    code += "}";
    var func = new Function("functions",code);
    return func(this.functions);
  },

};

// - -------------------------------------------------------------------- - //
// - stuff

// function getFunctionCode(method) {
//   var methodText = method.toString();
//   var methodWithArgs = methodText.match(/function [\w]*\(([\w\,\s]+)\)\s*/);
//   if (methodWithArgs && methodWithArgs[1]) {
//     var methodCode = methodText.substr(methodWithArgs[0].length).trim().replace(/^\{|\}$/g,"").trim();
//     var methodArgs = methodWithArgs[1].split(/\s*,\s*/).map(function(arg,idx) {
//       return "var " + arg + " = arguments[" + idx + "];";
//     });
//     return methodArgs.join("\n") + "\n" + methodCode + ";return;";
//   } else {
//     var methodWithoutArgs = methodText.match(/function [\w]*\(\)\s*/);
//     if (methodWithoutArgs) {
//       var methodCode = methodText.substr(methodWithoutArgs[0].length).trim().replace(/^\{|\}$/g,"").trim();
//       return methodCode + ";return;";
//     }
//   }
// }
//
//   if (embedCode) {
//     var methodsCode = methods.map(getFunctionCode);
//     var code = recurseMethodTree(tree,-1,methodsCode);
//     code.unshift("var len = arguments.length;");
//     code.push("throw new ReferenceError('signature not found');");
//     code = code.join("\n");
//     return new Function(code);
//   } else {
//     var code = recurseMethodTree(tree,-1);
//     code.unshift("return function() {","var len = arguments.length;");
//     code.push("throw new ReferenceError('signature not found');","}");
//     code = code.join("\n");
//     return new Function("methods",code)(methods);
//   }
// }

// - -------------------------------------------------------------------- - //

factory.createMethod = factory.method = new Method("createMethod",{

	// .createMethod(function)
	f: "return f",

	// .createMethod(error)
	e: "return function() { throw e }",

	// .createMethod(code)
	s: "return new Function(s)",

	// .createMethod(undefined)
	u: "return function() {}",

  // .createMethod(signatures)
  o: function(signatures) {
    return new Method(null,signatures).toFunction();
  },

  // .createMethod(name, signatures)
  so: function(name,signatures) {
    return new Method(name,signatures).toFunction();
  },

}).toFunction();

factory.cls = { Method: Method };

// - -------------------------------------------------------------------- - //
