const jwt = require('jsonwebtoken')
const express = require('express')

const app = express()
app.use(express.json())

const PRIVATE_KEY = 'myprivatekey'

const users = [
    {
      username: 'iram',
      password: 'qwerty'
    }
]

const generateToken = (user) => {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization
 
  if (!authHeader) {
    return res.status(401).json({
      error: 'not authenticated'
    })
  }
 
  const token = authHeader.split(' ')[1]
 
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: 'not authorized'
      })
    }
 
    req.user = decoded.data
    next()
  })
 }

app.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = users.find(u => u.username === username && u.password === password)

  if (!user) {
    return res.status(401).json({
      error: 'Usuario no encontrado'
    })
  }

  const token = generateToken({ username: user.username })

  return res.json({ token })
})

app.get('/profile', auth, (req, res) => {
  return res.json({ user: req.user })
})

app
  .listen(3000, () => console.log('Aplicación corriendo en el puerto 3000'))