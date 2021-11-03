
const suma = (a, b) => {
    if (a === undefined || b === undefined) {
        return new Error('Faltan parámetros')
    }
    return a + b
}

console.log('====Flujo básico correcto====')

const expected = 8

const result = suma(3, 5)

if (result === expected) {
    console.log('Test completado!')
} else {
    console.log('Test fallido')
}


console.log('====Flujo de error por falta de parámetros====')

const expected1 = 'Faltan parámetros'

const result1 = suma(3)

if (result1.message === expected1) {
    console.log('Test completado!')
} else {
    console.log('Test fallido')
}