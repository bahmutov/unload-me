console.log('*** WITH unload this code runs every time')
console.log('*** you call require("./with-unload")')
module.exports = 'with'
// require 'unload-me' to remove this module
// from require.cache and force loading and
// evaluating it again
require('..')
