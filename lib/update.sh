#!/bin/sh

# pulls latest version of fulljslint.js from jslint.com
# if you want to review changes in increments see:
# http://github.com/happygiraffe/jslint.com-mirror/commits/master/www.jslint.com/fulljslint.js

cd `dirname $0` &&
    curl -s jslint.com/fulljslint.js > fulljslint_export.js &&
    echo 'exports.JSLINT = JSLINT;' >> fulljslint_export.js
