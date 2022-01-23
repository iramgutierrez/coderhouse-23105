const express = require('express')
const newsController = require('../controllers/news.controller')

const router = express.Router()

router.get('/', newsController.all)
router.get('/:id', newsController.getOne)
router.post('/', newsController.create)
router.put('/:id', newsController.update)
router.delete('/:id', newsController.delete)

module.exports = router