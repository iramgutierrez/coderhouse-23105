const express = require('express')
const compression = require('compression')

const app = express()
app.use(compression())

app.get('/', (req, res) => {
  const welcome = 'Bienvenido!!!!'
  return res.send(welcome.repeat(1000))
})

const PORT = process.argv[2] || 8080

app
  .listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
  .on('error', console.error)