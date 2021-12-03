const express = require('express')

console.log(`Worker PID: ${process.pid}`)

const app = express()

const PORT = process.argv[2] || 8081

app.get('/', (req, res) => {
  console.log('Request recibido')
  return res.send(`Servidor express en ${PORT} - PID ${process.id}`)
})

app
  .listen(PORT, () => console.log(`Servidor express en ${PORT} - PID ${process.id}`))
  .on('error', err => console.log(err))