const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser('qwerty'))


app.get('/set', (req, res) => {
  res.cookie('server', 'express').send('Cookie set')
})

app.get('/setEX', (req, res) => {
  res.cookie('server2', 'express2', { maxAge: 30000 }).send('Cookie set')
})

app.get('/set-signed', (req, res) => {
  res.cookie('serverSigned', 'expressSigned', { signed: true }).send('Cookie set')
})

app.get('/get', (req, res) => {
  res.send({
    server: req.cookies.server,
    server2: req.cookies.server2,
    serverSigned: req.signedCookies.serverSigned
  })
})

app.get('/clear', (req, res) => {
  res.clearCookie('server').send('Cookie clear')
})

const PORT = 8000

app
  .listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
  .on('error', err => console.log(`Error en servidor: ${err}`))