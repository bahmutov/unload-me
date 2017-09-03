exports['unload-me demo generates expected output 1'] = `
  command: node ...
  code: 0
  failed: false
  killed: false
  signal: null
  timedOut: false

  stdout:
  -------
  --- loading module that is cached by default ---
  *** without unload this only runs once
  result: without
  loading it again
  result: without
  --- loading module that is self-unloading ---
  *** WITH unload this code runs every time
  *** you call require("./with-unload")
  result: with
  loading it again
  *** WITH unload this code runs every time
  *** you call require("./with-unload")
  result: with
  -------
  stderr:
  -------
  
  -------
  `

exports['returns FOO 1'] = `test`

exports['returns FOO as a string 1'] = `42`

