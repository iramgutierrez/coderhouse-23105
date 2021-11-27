const yargs = require('yargs/yargs')

const args = yargs(process.argv.slice(2))
    .alias({
        nombre: 'n'
    })
    .boolean('ayuda')
    .default({
        nombre: 'pepe',
        apellido: 'copado'
    })
    .argv


console.log({ args })