const db = require('../models/messages')


const Messages = db.messages


// get all messages
const getMessages = async (req, res) => {

    let messages = await Messages.findAll({})
    res.status(200).send(messages)

}

// get single messages
const getOneMessages = async (req, res) => {

    let id = req.params.id
    let messages = await Messages.findOne({ where: { id: id }})
    res.status(200).send(messages)

}


// delete messages
const deleteMessages = async (req, res) => {

    let id = req.params.id
    
    await Messages.destroy({ where: { id: id }} )

    res.status(200).send('Messages was deleted !')

}

module.exports = {
    getMessages,
    getOneMessages,
    deleteMessages,
}