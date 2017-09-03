console.log('--- loading module that is cached by default ---')
console.log('result:', require('./without-unload'))
console.log('loading it again')
console.log('result:', require('./without-unload'))

console.log('--- loading module that is self-unloading ---')
console.log('result:', require('./with-unload'))
console.log('loading it again')
console.log('result:', require('./with-unload'))
