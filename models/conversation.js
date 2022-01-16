module.exports = (sequelize, DataTypes) => {

    const Conversation = sequelize.define("conversation", {
        sender_PSID: {
            type: DataTypes.NUMBER,
        },
        sender_name: {
            type: DataTypes.STRING,
        },
        sender_birthdate: {
            type: DataTypes.DATE,
        },
        asked_question: {
            type: DataTypes.NUMBER,
            default: 1
        },
        is_open: {
            type: DataTypes.BOOLEAN,
            default: true
        },
    })

    return Match
}