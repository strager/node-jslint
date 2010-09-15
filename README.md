node-jslint
===========

Easily use [jslint][] from the command line. Pass it the JS file(s) you'd like to lint. For example:

    jslint foo.js bar.js

It assumes [nodejs][] globals and tolerates shebangs. Alternative JSLINT configuration 
may be passed in a JSON-formatted file via --config=FILE option, or by placing it in
 ~/.jslint.

Sample ~/.jslint that seems to work well for node.js:

   {
       "predef":   [ 
           "exports",
           "global",
           "process",
           "require",
           "__filename",
           "__dirname",
           "module"       
       ],
       "browser" : false,
       "devel" : false,
       "rhino" : false,
       "es5" : false, 
       "undef" : true,
       "widget": false,
       "windows" : false,
       "onvar" : true
   }


Installation
------------

You'll need [nodejs][] and [npm][], which is easy to install on OS X with [homebrew][]:

    curl -L http://github.com/mxcl/homebrew/tarball/master | tar xz --strip 1 -C /usr/local
    brew install npm

Then install:

    npm install jslint

You may also clone this repository then install in your working copy:

    npm install .

License
-------

You can modify, copy and redistribute this software under the WTFPL, Version 2.
See <http://sam.zoy.org/wtfpl/COPYING> for details.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[jslint]: http://jslint.com/
[nodejs]: http://nodejs.org/
[npm]: http://github.com/isaacs/npm
[homebrew]: http://github.com/mxcl/homebrew
