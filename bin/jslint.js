#!/usr/bin/env node
// jslint wrapper for nodejs
// Adapted from rhino.js. Copyright 2002 Douglas Crockford
// Shebang removal regex uses insecure "."
// JSLINT is provided by fulljslint.js modified to export the global

var assert = require("assert");
var path = require("path");
var sys = require("sys");
var fs = require("fs");
var jslint = require("../lib/fulljslint_export").JSLINT;

function processArguments(args) {
    var re = new RegExp("--(\\w+)=(.+)");
    var res = {files:[]};
    
    args.forEach(function(arg) {
	var m = re.exec(arg);
	if (m) {
	    res[m[1]] = m[2];
	} else {
	    res.files.push(arg);
	}
    });

    return res;
}

// assert.deepEqual({files:[]}, processArguments([]));
// assert.deepEqual({files:["foo"]}, processArguments(["foo"]));
// assert.deepEqual({files:["foo.js"], config:"conf.file", baz:"bang"}, processArguments(["--config=conf.file", "foo.js", "--baz=bang"]));

function existsSync(path) {
    try {
	fs.statSync(path);
	return true;
    } catch (e) {
	if (e.errno == 2) { // ENOENT
	    return false;
	} else {
	    throw e;
	}
    }
}

function getConfig(args) {
    function read(path) {
	try {
	    return JSON.parse(fs.readFileSync(path, "utf8"));
	} catch (e) {
	    sys.puts("jslint: failed to read config file " + path + ": " + e.message);
	    process.exit(1);
	}
    }

    var defaultConfig = {
	predef:   [ 
            // CommonJS
	    "exports",
	    // YUI
	    "YUI",
	    "YAHOO",
	    "YAHOO_config",
	    "YUI_config",
	    "Y",
	    // NodeJS
	    "GLOBAL",
	    "process",
	    "require",
	    "__filename",
	    "__dirname",
	    "module"       
	]	 
    };

    if (args.config) {
	return read(args.config);
    } 
    
    var f = process.env.HOME + "/.jslint";

    if (existsSync(f)) {
	return read(f);
    }

    return defaultConfig;
}


var args = processArguments(process.ARGV.slice(2));

var jslint_options = getConfig(args);
var files = args.files;

if (!files.length) {
    sys.puts("Usage: jslint [--config=CONFIG_FILE] file.js [more inputs...]");
    process.exit(1);
}

var exit_code = 0;

files.forEach(function(file) {
    var input;

    try {
        input = fs.readFileSync(file, "utf8");
    } catch (err) {
        sys.puts("ERROR: Couldn't open file '" + file + "'.");
        exit_code += 1;
        return;
    }

    // remove shebang (lifted from node.js)
    input = input.replace(/^\#\!.*/, "");

    var i, len, e;

    if (!jslint(input, jslint_options)) {
        exit_code += 1;
        i = 0;
        len = jslint.errors.length;
        for (i=0; i<len; i++) {
            e = jslint.errors[i];
            if (e) {
                sys.puts(file + ":" + (e.line + 1) + ":" + (e.character + 1) + ":" + e.reason);
                sys.puts("    " + (e.evidence || "").replace(/^\s+|\s+$/, ""));
            }
        }
    }
});

process.exit(exit_code);
