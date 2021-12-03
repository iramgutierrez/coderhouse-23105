const cluster = require('cluster')
const express = require('express')

const cpus = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`${cpus} procesadores detectados`)
  console.log(`Master PID: ${process.pid}`)

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} terminado`)
    cluster.fork()
  })
} else {
  console.log(`Worker PID ${process.pid}`)
  const app = express()
  const PORT = process.argv[2] || 8080
  
  app.get('/', (req, res) => {
    return res.send(`Servidor express en ${PORT} - PID ${process.pid} - ${ new Date() }`)
  })

  app
    .listen(PORT, () => console.log(`Servidor express en ${PORT} - PID ${process.pid} - ${ new Date() }`))
    .on('error', err => console.log(err))
}