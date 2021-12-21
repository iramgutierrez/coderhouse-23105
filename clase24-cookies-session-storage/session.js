const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

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
  secret: 'desafioClase25',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:'mongodb://localhost:27017/sessions',
    ttl: 20 
  }),
  cookie: { maxAge: 20000 }
}))



app.get('/data', (req, res) => {
  req.session.data = true
  return res.json(req.session)
})

app.get('/session', (req, res) => {
  return res.json(req.session)
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