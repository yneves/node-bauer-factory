/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

// - -------------------------------------------------------------------- - //
// - Libs

var lib = {
    merge: require("./merge.js"),  
    class: require("./class.js"),
    method: require("./method.js"),  
};

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = {};

// - -------------------------------------------------------------------- - //

var Evaluator = lib.class.createClass({
  
    // new Evaluator(expr,vars)
    constructor: function(expr,vars) {
        if (expr) {
            this.setExpr(expr);
        }
        if (vars) {
            this.setVars(vars);
        }      
    },
  
    setVars: {

        // .setVars(vars)
        o: function(vars) {
            this.vars = vars;
        },

    },
  
    setExpr: {
    
        // .setExpr(options)
        o: function(options) {
            if (options.variables) {
                this.setVars(options.vars);
            }
            if (options.expr) {
                this.setExpr(options.expr);
            }        
        },
    
        // .setExpr(expr)
        s: function(expr) {
            var copy = expr.replace(/\.[a-zA-Z\_]+[a-zA-Z0-9\_]?/g,'');
            var names = copy.match(/([a-zA-Z\_]+[a-zA-Z0-9\_]?)/g);
            var length = names.length;
            var code = [
                "var vars = {};",
                "var argsLength = arguments.length;",
                "for (var i = 0; i < argsLength; i++) {",
                    "var arg = arguments[i];",
                    "if (arg instanceof Object) {",
                        "var names = Object.keys(arg);",
                        "var namesLength = names.length;",
                        "for (var n = 0; n < namesLength; n++) {",
                            "var name = names[n];",
                            "vars[name] = arg[name];",
                        "}",
                    "}",
                "}",
            ];      
            for (var i = 0; i < length; i++) {
                code.push("var " + names[i] + " = vars['" + names[i] + "'];");
            }      
            code.push("return (" + expr + ");");
            code = code.join("\n");
            this.code = new Function(code);
            this.names = names;
        },
    
  },
  
    // .evaluate(vars)
    evaluate: function(vars) {
        return this.code.call(this,this.vars,vars);
    },
  
});

// - -------------------------------------------------------------------- - //

factory.evaluator = factory.createEvaluator = lib.method.createMethod({

    // .createEvaluator(options)
    o: function(options) {
        return new Evaluator(options);
    },

    // .createEvaluator(expr)
    s: function(expr) {
        return new Evaluator(expr);
    },

    // .createEvaluator(expr,vars)
    so: function(expr,vars) {
        return new Evaluator(expr,vars);
    },
  
});

factory.isEvaluator = function(arg) {
    return arg instanceof Evaluator;
};

// - -------------------------------------------------------------------- - //

factory.cls = { 
    Evaluator: Evaluator 
};

// - -------------------------------------------------------------------- - //
