const axios = require('axios')
const Messages = require('../models/messages')
const Conversation = require('../models/conversation')
const questions = require('../constants/questions')
const responses = require('../constants/responses')
const { daysUntilNextBirthDay } = require('../utils/birthDate')

const handleMessages = async (sender_PSID, receivedMessages) => {
    const response = {}

    if (receivedMessages.text) {
        const messages = new Messages({ sender_PSID, text: receivedMessages.text })
        const conversation = await Conversation.findOne({ sender_PSID, isOpen: true })

        if (!conversation) {
            await Conversation.create({ sender_PSID })
            response.text = questions.askName
        } else {
            const { asked_questions } = conversation
            if (asked_questions === 1) {
                conversation.sender_name = receivedMessages.text
                conversation.asked_questions++
                await conversation.save()

                response.text = `Hi ${receivedMessages.text}, ${questions.askBirthDate}`
            }

            else if (asked_questions === 2) {
                conversation.sender_birthDate = new Date(receivedMessages.text)
                conversation.asked_questions++
                await conversation.save()

                response.text = questions.askNextBirthDay
            }

            else if (asked_questions === 3) {
                const isAskingNextBirthDay = receivedMessages.text.toLowerCase()
                if (responses['yes'].includes(isAskingNextBirthDay)) {
                    const { sender_birthdate } = conversation
                    response.text = `There are ${daysUntilNextBirthDay(sender_birthdate)} days left until your next birthday`
                }

                else if (responses['no'].includes(isAskingNextBirthDay)) {
                    response.text = `Goodbye`
                }

                else {
                    response.text = `I don't know what you are talking about`
                }

                conversation.is_open = false
                await conversation.save()
            }
        }

        await messages.save()
    }

    this.callSendAPI(sender_PSID, response)
}

const callSendAPI = (sender_PSID, response) => {
    const body = {
        recipient: {
            id: sender_PSID
        },
        message: response
    }

    axios
        .post(`https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`, body)
        .then(response => console.log('message sent'))
        .catch(error => console.error('Unable to send message: ' + error))
}

module.exports = {
    handleMessages,
    callSendAPI
}

