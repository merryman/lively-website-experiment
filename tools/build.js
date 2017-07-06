/*global require, process*/
var systemjs = require('../lively.modules/node_modules/systemjs');
var lang = require('../lively.lang');
var ast = require('../lively.ast');
var classes = require('../lively.classes');
var fs = require("fs");
var path = require("path");
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

var targetFile = "dist/hornung.js";
const opts = {classHolder: {type: "Identifier", name: "_classRecorder"}, functionNode: {type: "Identifier", name: "lively.classes.runtime.initializeClass"}};                           

// output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
module.exports = Promise.resolve()
  .then(() => rollup.rollup({
    entry: "index.js",
    plugins: [
      {transform: (source, id) => {                                                           
            return ast.stringify(ast.transform.objectSpreadTransform(classes.classToFunctionTransform(source, opts)));
        }},
      babel({
        exclude: 'node_modules/**', sourceMap: false,
        "presets": [["es2015", {modules: false}]],
        "plugins": ['transform-async-to-generator', "syntax-object-rest-spread", "transform-object-rest-spread", "external-helpers", "syntax-exponentiation-operator"],
        babelrc: false
      })]
  }))
  .then(bundle =>
    bundle.generate({
      format: 'iife',
      moduleName: 'hornung',
      globals: {
        "lively.graphics": "lively.graphics",
        "lively.lang": "lively.lang",
        "lively.bindings": "lively.bindings",
        "lively.morphic": "lively.morphic",
        "svg-intersections": "svgIntersections"
      },
    }))

  // 3. massage code a little
  .then(bundled => {
    return `(function() {
  var GLOBAL = typeof window !== "undefined" ? window :
      typeof global!=="undefined" ? global :
        typeof self!=="undefined" ? self : this;
  ${fs.readFileSync(require.resolve('./lively.morphic.js')).toString()}
  (function moduleInit() {
    if (!lively.morphic.Label) {
       setTimeout(moduleInit, 0);
       return;
    }
  ${bundled.code} })()
  if (typeof module !== "undefined" && module.exports) module.exports = GLOBAL.lively.classes;
})();`
})
// 4. inject dependencies
.then(source => {
    fs.writeFileSync(targetFile, source);
  })
  .catch(err => { console.error(err.stack || err); throw err; })
