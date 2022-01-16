const express = require('express')
const router = express.Router()
const { getMessages, getOneMessages, deleteMessages } = require('../controllers/messages')

router.get('/messages', getMessages)
router.get('/message/:messageId', getOneMessages)
router.delete('/message/:messageId', deleteMessages)

module.exports = router