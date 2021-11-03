const faker = require('faker')

faker.locale = 'es'

const getUser = () => {
    return {
        nombre: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        website: faker.internet.url(),
        image: faker.image.avatar()
    }
}

module.exports = getUser