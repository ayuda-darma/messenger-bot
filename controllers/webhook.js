const { handleMessages } = require('../services/webhook')
const dotenv = require('dotenv')
dotenv.config()



// get all messages
const getWebhook = async (req, res) => {

    const VERIFY_TOKEN = process.env.VERIFY_TOKEN
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK VERIFIED')
            return res.status(200).send(challenge)
        }

        res.sendStatus(403)
    }

}

const postWebhook = async (req, res) => {

    let body = req.body

    if (body.object === 'page') {
        body.entry.forEach(async (entry) => {
            let webhookEvent = entry.messaging[0]
            console.log(webhookEvent)

            let sender_PSID = webhookEvent.sender.id
            console.log('Sender PSID: ' + sender_PSID)

            if (webhookEvent.message) {
                await handleMessages(sender_PSID, webhookEvent.message)
            }
        })

        return res.status(200).send('EVENT_RECEIVED')
    }

    res.sendStatus(404)

}

module.exports = {
    getWebhook,
    postWebhook,
}