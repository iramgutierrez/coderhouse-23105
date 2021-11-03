const express = require('express')
const ApiUsuariosMock = require('../api/usuarios.js')

class UsuariosRouter extends express.Router {
    constructor() {
        super()

        const apiUsuarios = new ApiUsuariosMock()
        
        this.get('', async (req, res, next) => {
            const usuarios = await apiUsuarios.listar(req.query.limit)

            res.json(usuarios)
        })

        this.post('', async (req, res, next) => {
            const usuarios = await apiUsuarios.listar(1)

            res.json(usuarios[0])
        })
    }

}

module.exports = UsuariosRouter