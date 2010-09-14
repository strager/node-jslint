#!/bin/sh

# pulls latest version of fulljslint.js from jslint.com
# if you want to review changes in increments see:
# http://github.com/happygiraffe/jslint.com-mirror/commits/master/www.jslint.com/fulljslint.js

input="http://jslint.com/fulljslint.js"
output="`dirname $0`/fulljslint_export.js"

# use wget if available, curl if not
if type -t wget > /dev/null; then
    fetch_cmd="wget -O"
elif type -t curl > /dev/null; then
    fetch_cmd="curl -o"
else
    echo "wget or curl must be installed to fetch '$input'";
    exit 1;
fi

$fetch_cmd "$output" "$input" &&
    echo "\n// export for node-jslint\nexports.JSLINT = JSLINT;" >> "$output"
