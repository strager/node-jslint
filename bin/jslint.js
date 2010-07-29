#!/usr/bin/env node
// jslint wrapper for nodejs
// Adapted from rhino.js. Copyright 2002 Douglas Crockford
// Shebang removal regex uses insecure "."
// JSLINT is provided by fulljslint.js modified to export the global

(function (file) {
    var e, i, input, len, e_num,
        sys = require("sys"),
        fs = require("fs"),
        jslint = require("../lib/fulljslint_export").JSLINT,
        jslint_options = {
            predef: [
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
                "module"
            ]
        };

    if (!file) {
        sys.puts("Usage: jslint file.js");
        process.exit(1);
    }

    try {
        input = fs.readFileSync(file, "utf8");
    } catch (err) {
        sys.puts("jslint: Couldn't open file '" + file + "'.");
        process.exit(1);
    }

    // remove shebang (lifted from node.js)
    input = input.replace(/^\#\!.*/, "");

    if (!jslint(input, jslint_options)) {
        i = 0;
        len = jslint.errors.length;
        for (i=0; i<len; i++) {
            e = jslint.errors[i];
            if (e) {
                e_num = (i + 1) + " ";
                while (e_num.length < 4) {
                    e_num = " " + e_num;
                }
                sys.puts(e_num + e.line + "," + e.character + ": " + e.reason);
                sys.puts("    " + (e.evidence || "").replace(/^\s+|\s+$/, ""));
            }
        }
        process.exit(2);
    }

    sys.puts("OK");

}(process.argv[2]));
