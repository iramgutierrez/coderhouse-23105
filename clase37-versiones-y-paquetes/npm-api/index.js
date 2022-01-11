const express = require('express')
const message = require('coder-iram-clase37')

const app = express()

app.get('/', (req, res) => {
  return res.send(message('Iram'))
})

const PORT = process.argv[2] || 3000

app
  .listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
  .on('error', console.error)