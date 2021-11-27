const express = require('express')
const Cache = require('node-cache')
const session = require('express-session')


const { 
  verifyUsername,
  verifyPassword
} = require('./middleware')

const app = express()
const cache = new Cache()

app.use(session({
  secret: 'qwerty'
}))

app.use(express.json())

app.post('/signup', verifyUsername, verifyPassword, (req, res) => {
  const previousUser = cache.get(req.body.username)

  if (previousUser) {
    return res.status(400).json({
      error: 'El nombre de usuario ya existe'
    })
  }

  const user = {
    username: req.body.username,
    password: req.body.password
  }
  /* cache.set('anykey', {
    key1: 'value1',
    key2: 'value2'
  })

  cache.get('anykey') */
  cache.set(req.body.username, user)

  return res.json(cache.get(req.body.username))
})

app.post('/login', verifyUsername, verifyPassword, (req, res) => {
  const user = cache.get(req.body.username)

  if (!user) {
    return res.status(400).json({
      error: 'El nombre de usuario no existe'
    })
  }

  if (user.password !== req.body.password) {
    return res.status(400).json({
      error: 'La contraseña es incorrecta.'
    })
  }

  req.session.user = req.body.username
  return res.json({
    user: req.session.user
  })
})

app.get('/profile', verifySession, (req, res) => {
  return res.json({
    user: req.session.user
  })
})

const PORT = 8080

app
  .listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
  .on('error', error => console.log(`Error en servidor: ${error}`))