const newsService = require('../services/news.service')

module.exports = {
  all: async (req, res) => {
    try {
      const news = await newsService.find({ page: req.query.page || 1 })
      return res.json(news)
    } catch (e) {
      return res.status(500).json({ err: e.message })
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params
      const newFound = await newsService.findById(id)
      return res.json(newFound)
    } catch (e) {
      return res.status(500).json({ err: e.message })
    }
  },
  create: async (req, res) => {
    try {
      const newCreated = await newsService.create(req.body)
      return res.json(newCreated)
    } catch (e) {
      return res.status(500).json({ err: e.message })
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params
      const newUpdated = await newsService.update(id, req.body)
      return res.json(newUpdated)
    } catch (e) {
      return res.status(500).json({ err: e.message })
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params
      const newDeleted = await newsService.delete(id)
      return res.json(newDeleted)
    } catch (e) {
      return res.status(500).json({ err: e.message })
    }
  }
}
