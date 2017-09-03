# unload-me

> Self-destruct the current module from require cache

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Why

Node `require` function for speed only evaluates each module once and stores
the result (whatever the module `exports`) in the module cache. Sometimes this
causes problems, for example if you really need to re-evaluate the module again.

For example we might have a module that just reports if the environment variable
is present

```js
// is-foo.js
module.exports = String(process.env.FOO)
```

When testing this module, we might set `process.env.FOO` before the first test and it works

```js
it('returns FOO', () => {
  process.env.FOO = 'test'
  const foo = require('./is-foo')
  expect(foo).to.be('test')
})
```

But when we write another test it suddenly fails

```js
it('returns FOO as a string', () => {
  process.env.FOO = 42
  const foo = require('./is-foo')
  expect(foo).to.be('42')
})
// Error:
//   expect "test" to be "42"
```

Why is `foo` still the first value? Let us enable just the second test - and it passes!

```js
it.only('returns FOO as a string', () => {
  process.env.FOO = 42
  const foo = require('./is-foo')
  expect(foo).to.be('42')
})
// passes!
```

This is a pesky test failure because it depends on the order of tests, something 
[Rocha](https://github.com/bahmutov/rocha) can catch, but that is the point here.

The point is that module `./is-foo` is executed only *once* in our tests. The second
time we `require('./is-foo')` the code inside (the single statement 
`module.exports = String(process.env.FOO)`) is NOT evaluated. Instead the cached value
"test" is loaded and returned.

We can avoid caching value by switching `is-foo` to return a function

```js
// is-foo
module.exports = () => String(process.env.FOO)
```

and every client can just execute this function.

```js
process.env.FOO = 42
const foo = require('./is-foo')()
// foo is now '42'
```

But we can also easily make the module `is-foo` *self-destruct* from the `require.cache`
to force Node module system to reload an reevaluate its code. Just add a single line to
the module.

```js
module.exports = String(process.env.FOO)
require('unload-me')
```

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save unload-me
```

## Use

Just call `require('unload-me')` at the end of the module you want to "self-destruct".
It will be re-evaluated next time someone requires it. 

```js
console.log('*** WITH unload this code runs every time')
console.log('*** you call require("./with-unload")')
module.exports = 'foo'
// require 'unload-me' to remove this module
// from require.cache and force loading and
// evaluating it again
require('unload-me')
```

See [test/demo.js](test/demo.js) for full example

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/unload-me/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/unload-me.svg?downloads=true
[npm-url]: https://npmjs.org/package/unload-me
[ci-image]: https://travis-ci.org/bahmutov/unload-me.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/unload-me
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
