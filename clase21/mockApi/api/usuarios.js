const getUser = require('../utils/getUser.js')

class ApiUsuariosMock {
    constructor() {}

    listar(cant = 50) {
        const users = []
        for (let i = 0; i < cant; i ++) {
            const user = getUser()
            users.push(user)
        }

        return users
    }
}

module.exports = ApiUsuariosMock