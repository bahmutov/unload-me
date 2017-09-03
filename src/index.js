const debug = require('debug')('unload-me')
debug('unload-me module')

if (module.parent) {
  debug('from parent module')
  debug(module.parent.filename)
  delete require.cache[module.parent.filename]

  const pp = module.parent.parent
  if (pp) {
    pp.children = pp.children.filter(m => m !== module.parent)
  }
  delete require.cache[__filename]
} else {
  console.error('loading directly without parent')
  console.error('you probably want to require this')
  console.error('from another module')
  process.exit(1)
}
