const cluster = require('cluster')
const http = require('http')

const cpus = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  http.createServer((req, res) => {
    res.writeHead(200)
    res.end('Hello world')
  }).listen(8080)

  console.log(`Worker ${process.pid} started`)
}