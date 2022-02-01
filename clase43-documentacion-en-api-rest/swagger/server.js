const express = require('express')
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      description: "A simple CRUD API application made with Express and documented with Swagger",
    }
  },
  apis: [ './docs/**/*.yaml' ]
}

const app = express()

const specs = swaggerJsdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

app.get('', (req, res) => {
  return res.json({
    date: new Date()
  })
})

const PORT = process.argv[2] || 3000

app
  .listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
  .on('error', err => console.error(err))