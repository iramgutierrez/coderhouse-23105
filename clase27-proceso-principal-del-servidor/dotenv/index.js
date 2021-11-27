const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    //path: process.env.MODO === 'byn'
    path: process.argv[3] === 'byn'
        ? path.resolve(__dirname, 'byn.env')
        : path.resolve(__dirname, 'colores.env')
})

const frente = process.env.FRENTE
const fondo = process.env.FONDO

console.log({
    frente,
    fondo
})