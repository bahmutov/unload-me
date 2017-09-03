'use strict'

/* eslint-env mocha */
const execa = require('execa-wrap')
const snapshot = require('snap-shot-it')
const join = require('path').join

describe('unload-me demo', () => {
  it('generates expected output', () => {
    // first module is cached
    // second module is re-evaluated
    const demoPath = join(__dirname, 'demo')
    return execa('node', [demoPath]).then(snapshot)
  })
})

it('returns FOO', () => {
  process.env.FOO = 'test'
  const foo = require('./is-foo')()
  snapshot(foo)
})

it('returns FOO as a string', () => {
  process.env.FOO = 42
  const foo = require('./is-foo')()
  snapshot(foo)
})
