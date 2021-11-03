const express = require('express')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const expressSession = require('express-session')
const mongoose = require('mongoose')
const flash = require('connect-flash')

const User = require('./models/User')

const {
  createHash,
  isValidPassword
} = require('./utils')

mongoose.connect('mongodb://127.0.0.1:27017/clase23')
const app = express()
app.use(express.urlencoded())

app.use(expressSession({ secret: 'anysecret' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.set('view engine', 'ejs')

passport.use('login', new LocalStrategy(
  (username, password, done) => {
    return User.findOne({ username })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Nombre de usuario incorrecto' })
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, { message: 'Contraseña incorrecta' })
        }

        return done(null, user)
      })
      .catch(err => {
        return done(err)
      })
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use('signup', new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, done) => {
  return User.findOne({ username })
    .then(user => {
      if (user) {
        return done(null, false, { message: 'El nombre de usuario ya existe' })
      }

      let newUser = new User()
      newUser.username = username
      newUser.password = createHash(password)
      newUser.email = req.body.email
      return newUser.save()
    })
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      return done(err)
    })
}))

app.get('/login', (req, res) => {
  return res.render('login.ejs', { message: req.flash('error') })
})

app.post('/login', 
  passport.authenticate('login', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }))

app.get('/signup', (req, res) => {
  return res.render('signup.ejs', { message: req.flash('error') })
})

app.post('/signup', 
  passport.authenticate('signup', { successRedirect: '/',
                                   failureRedirect: '/signup',
                                   failureFlash: true }))


app.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  
  return res.redirect('/login')
}, (req, res) => {
  return res.json(req.user)
})

const PORT = 8081

app
  .listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
  .on('error', error => console.log(`Error en servidor: ${error}`))