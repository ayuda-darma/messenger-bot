module.exports = (sequelize, DataTypes) => {

    const Messages = sequelize.define("messages", {
        sender_PSID: {
            type: DataTypes.NUMBER,
        },
        Text: {
            type: DataTypes.STRING,
        },
    })

    return Match
}