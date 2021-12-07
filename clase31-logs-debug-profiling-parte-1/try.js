const express = require('express')
const compression = require('compression')
const tryModule = require('./try-promise')

const app = express()
app.use(compression())

app.get('/', (req, res) => {

  return tryModule()
    .then(result => {
      const welcome = 'Bienvenido!!!'
      return res.send(welcome.repeat(1000))
    })
    .catch(err => {
      console.error(err)
      return res.send(err.message)
    })
})

const PORT = process.argv[2] || 8080

app
  .listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
  .on('error', console.error)