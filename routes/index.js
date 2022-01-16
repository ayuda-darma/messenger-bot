const webhookRoutes = require('./webhook')
const messagesRoutes = require('./messages')

module.exports = {
    webhook: webhookRoutes,
    messages: messagesRoutes
}