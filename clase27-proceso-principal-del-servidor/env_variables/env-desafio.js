const modo = process.env.MODO || 'prod'
const puerto = process.env.PUERTO ? parseInt(process.env.PUERTO) : 0
const debug = process.env.DEBUG ? process.env.DEBUG === 'true' : false

console.log({
    modo,
    puerto,
    debug
})