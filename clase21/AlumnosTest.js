const Alumnos = require('./Alumnos')
const AlumnosContenedorMock = require('./AlumnosContenedorMock')

console.log('====Test de funcionalidad correcta básica====')

const expected = 'Andres, Ariel, Baltasar, Carlos, Diego'

const contenedorMock = new AlumnosContenedorMock()
const alumnos = new Alumnos(contenedorMock)

const result = alumnos.listarAlumnos()

if (result === expected) {
    console.log('Test completado!')
    console.log(result)
} else {
    console.log('Test fallido')
}