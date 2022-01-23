const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('', (req, res) => {
    return res.json({
      origin: req.header('origin'),
      date: new Date()
    })
})

const PORT = process.argv[2] || 3000

app
  .listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
  .on('error', (err) => console.error(err))