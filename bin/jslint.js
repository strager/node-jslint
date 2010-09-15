#!/usr/bin/env node
// jslint wrapper for nodejs
// Adapted from rhino.js. Copyright 2002 Douglas Crockford
// Shebang removal regex uses insecure "."
// JSLINT is provided by fulljslint.js modified to export the global

(function (files) {
    var e, i, input, len, e_num,
        batch = (files.length > 1),
        exit_code = 0,
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

    if (!files.length) {
        sys.puts("Usage: jslint file.js [file2.js]");
        process.exit(1);
    }

    files.forEach(function(file) {
        try {
            input = fs.readFileSync(file, "utf8");
        } catch (err) {
            sys.puts("ERROR: Couldn't open file '" + file + "'.");
            exit_code += 1;
            return;
        }

        // remove shebang (lifted from node.js)
        input = input.replace(/^\#\!.*/, "");

        if (!jslint(input, jslint_options)) {
            exit_code += 1;
            i = 0;
            len = jslint.errors.length;
            for (i=0; i<len; i++) {
                e = jslint.errors[i];
                if (e) {
                    e_num = (i + 1) + " ";
                    while (e_num.length < 4) {
                        e_num = " " + e_num;
                    }
                    sys.puts(file + ":" + (e.line + 1) + ":" + (e.character + 1) + ":" + e.reason);
                    sys.puts("    " + (e.evidence || "").replace(/^\s+|\s+$/, ""));
                }
            }
        }
    });

    process.exit(exit_code);

}(process.argv.slice(2)));
