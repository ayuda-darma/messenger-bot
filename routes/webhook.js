const express = require('express')
const router = express.Router()
const { getWebhook, postWebhook } = require('../controllers/webhook')

router.get('/webhook', getWebhook)
router.post('/webhook', postWebhook)

module.exports = router