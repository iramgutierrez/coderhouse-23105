const express = require('express')
const Cache = require('node-cache')

const {
  verifyUsername,
  verifyPassword
} = require('./middleware')

const app = express()
const cache = new Cache()

app.use(express.json())

app.post('/signup', verifyUsername, verifyPassword, (req, res) => {
  const previousUser = cache.get(req.body.username)

  console.log({ previousUser })

  if (previousUser) {
    return res.status(400).json({
      error: 'El nombre de usuario ya existe'
    })
  }

  const user = {
    username: req.body.username,
    password: req.body.password
  }

  cache.set(req.body.username, user)

  return res.json(cache.get(req.body.username))

})

app.post('/login', verifyUsername, verifyPassword, (req, res) => {
  const user = cache.get(req.body.username)
  console.log({ user })

  if (!user) {
    return res.status(400).json({
      error: 'El nombre de usuario no existe'
    })
  }

  if (req.body.password !== user.password) {
    return res.status(400).json({
      error: 'La contraseña es incorrecta'
    })
  }

  const userResponse = {
    username: user.username,
    token: 'anyjwttoken'
  }

  return res.json(userResponse)
})

const PORT = 8080

app
  .listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
  .on('error', error => console.log(`Error en servidor: ${error}`))