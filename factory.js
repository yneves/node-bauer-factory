/*!
**  bauer-factory -- General utilities for nodejs.
**  Copyright (c) 2014 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/node-bauer-factory>
*/

// - -------------------------------------------------------------------- - //
// - Libs

var modules = [
	require("./lib/type.js"),
	require("./lib/method.js"),
	require("./lib/inherits.js"),
	require("./lib/property.js"),
	require("./lib/class.js"),
	require("./lib/error.js"),
	require("./lib/extend.js"),
	require("./lib/merge.js"),
	require("./lib/clone.js"),
	require("./lib/stub.js"),
];

// - -------------------------------------------------------------------- - //
// - Exports

var factory = module.exports = { cls: {} };

// - -------------------------------------------------------------------- - //

modules.forEach(function(mod) {
	var keys = Object.keys(mod);
	var length = keys.length;
	for (var i = 0; i < length; i++) {
		var key = keys[i];
		if (key === "cls") {
			var classes = Object.keys(mod[key]);
			var clength = classes.length;
			for (var c = 0; c < clength; c++) {
				factory.cls[classes[c]] = mod[key][classes[c]];
			}
		} else {
			factory[key] = mod[key];
		}
	}
});

// - -------------------------------------------------------------------- - //

factory.extend({

	// .toArray(arg)
	toArray: function(arg) { return Array.prototype.slice.call(arg); },

});

// - -------------------------------------------------------------------- - //

factory.extend({

	// .guid()
	guid: function() {
	  var uid = "";
	  for (var i = 0; i < 8 ; i++) {
	    uid += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return uid;
	},

});

// - -------------------------------------------------------------------- - //

module.exports = exports = factory;

// - -------------------------------------------------------------------- - //
