const faker = require('faker')

const fakeObject = {
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    email: faker.internet.email(),
    puesto: faker.name.jobTitle(),
    lugar: faker.random.locale()
}

console.log(fakeObject)