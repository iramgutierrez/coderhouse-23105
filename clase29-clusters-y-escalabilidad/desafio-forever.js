const http = require('http')

const PORT = process.argv[2] || 8080

http.createServer((req, res) => {
  res.writeHead(200)
  res.end('Hello world')
}).listen(PORT)