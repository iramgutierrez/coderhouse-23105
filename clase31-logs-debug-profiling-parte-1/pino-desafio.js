const express = require('express')
const loggerModule = require('./pino-module')

const app = express()
const logger = loggerModule(process.env.NODE_ENV)


app.get('/suma', (req, res) => {
  let { a, b } = req.query
  const isValidA = !isNaN(a)
  if (!isValidA) {
    logger.error(`Se recibio un número inválido: ${a}`)
    return res.status(400).send(`El valor ${a} no es un número válido`)
  }
  const isValidB = !isNaN(b)
  if (!isValidB) {
    logger.error(`Se recibio un número inválido: ${b}`)
    return res.status(400).send(`El valor ${b} no es un número válido`)
  }

  const suma = parseInt(a) + parseInt(b)
  logger.info('Operación exitosa!')
  return res.send(`${suma}`)
})

app.get('/not-found', (req, res) => {
  logger.warn('Se recibio una petición a un recurso no válido.')
  return res.send('Página no encontrada')
})

const PORT = process.argv[2] || 8080

app
  .listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
  .on('error', logger.error)

