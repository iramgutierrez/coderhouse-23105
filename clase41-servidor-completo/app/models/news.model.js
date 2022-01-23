const mongoose = require('mongoose')

const newSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
})

module.exports = mongoose.model('New', newSchema)