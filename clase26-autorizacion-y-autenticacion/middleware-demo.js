const express = require('express')

const app = express()

const PORT = 8000


const middleware1 = (req, res, next) => {
  if (false) {
    return res.json({
      error: 'Interceptado en el primer middleware'
    })
  }

  return next()
}

const middleware2 = (req, res, next) => {
  if (false) {
    return res.json({
      error: 'Interceptado en el segundo middleware'
    })
  }

  return next()
}

app.get('/home',
  middleware1,
  middleware2,
  (req, res) => {
    return res.json({
      message: 'Bienvenido al home.'
    })
  }
)

app
  .listen(PORT, () => console.log(`Servidor inicializado en el puerto ${PORT}`))
  .on('error', error => console.log(`Error de servidor: ${error}`))

