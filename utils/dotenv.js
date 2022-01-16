const dotenv = require('dotenv')

const loadEnvironments = () => {
    dotenv.config()
}

module.exports = loadEnvironments()