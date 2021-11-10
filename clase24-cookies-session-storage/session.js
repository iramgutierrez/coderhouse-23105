const express = require('express')
const session = require('express-session')

const app = express()

const users = [
  {
    username: 'iram',
    password: 'qwerty',
    admin: true
  },
  {
    username: 'marcelo',
    password: '123456',
    admin: false
  }
]

const auth = (req, res, next) => {
  if (req.session.user) {
    return next()
  }

  return  res.status(401).json({
    error: 'Necesitas iniciar sesión'
  })
}

const isAdmin = (req, res, next) => {
  if (req.session.admin) {
    return next()
  }

  return  res.status(401).json({
    error: 'Necesitas ser usuario administrador'
  })
}


app.use(session({
  secret: 'qwerty'
}))

app.get('/session', (req, res) => {
  if (req.session.contador) {
    req.session.contador++
    return res.send(`Has visitado ${req.session.contador} veces el sitio`)
  }

  req.session.contador = 1
  return res.send('Bienvenido.')
})

app.get('/logout', (req, res) => {
  return req.session.destroy(err => {
    if (!err) {
      return res.json({ logout: true })
    }

    return res.json({ error: err })
  })
})

app.get('/login', (req, res) => {
  const { username, password } = req.query

  const user = users.find(u => {
    return u.username === username && u.password === password
  })

  if (!user) {
    return res.json({ error: 'Login failed'})
  }

  req.session.user = username
  req.session.admin = user.admin

  return res.json({
    user: req.session.user,
    admin: req.session.admin
  })
})

app.get('/profile', auth, (req, res) => {
  return res.json({
    user: req.session.user,
    admin: req.session.admin
  })
})

app.get('/admin', auth, isAdmin, (req, res) => {
  return res.send('Si estas viendo esto es por que eres usuario administrador')
})

const PORT = 8000

app
  .listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
  .on('error', err => console.log(`Error en servidor: ${err}`))