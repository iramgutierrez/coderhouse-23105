const newsModel = require('../models/news.model')

module.exports = {
  find: async () => {
    return newsModel.find()
  },
  findById: async (id) => {
    const newFound = await newsModel.findById(id)

    if (!newFound) {
      throw new Error('Noticia no encontrada')
    }

    return newFound
  },
  create: async (data) => {
    data.createdAt = new Date()
    data.updatedAt = new Date()
    const item = new newsModel(data)
    return item.save()
  },
  update: async (id, data) => {
    data.updatedAt = new Date()
    const response = await newsModel.findOneAndUpdate({ _id: id }, data, { rawResult: true })

    /* const newFound = await newsModel.findById(id)

    if (!newFound) {
      throw new Error('Noticia no encontrada')
    }

    newFound.title = data.title || newFound.title
    newFound.body = data.body || newFound.body
    newFound.updatedAt = data.updatedAt

    return newFound.save() */

    if (!response.value) {
      throw new Error('Noticia no encontrada')
    }

    return response.value
  },
  delete: async (id) => {
    const response = await newsModel.findOneAndDelete({ _id: id })

    /* const newFound = await newsModel.findById(id)

    if (!newFound) {
      throw new Error('Noticia no encontrada')
    }

    return newFound.remove() */

    if (!response) {
      throw new Error('Noticia no encontrada')
    }

    return response
  }
}