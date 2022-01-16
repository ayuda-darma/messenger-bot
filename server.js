'use strict';

const express = require ('express')
const cors = require ('cors')
const routes = require('./routes')
const app = express ();



// middleware

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cors())

// router
app.use(routes.webhook)
app.use(routes.messages)


//testing api
app.get('/', (req, res) => {
    res.json({ message: 'hello from api' })
})

// port
const PORT = process.env.PORT || 8080

// server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})