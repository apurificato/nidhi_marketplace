require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 6969

const cookieParser = require('cookie-parser')

const client = require('./config/client')

const auth_routes = require('./routes/auth_routes')

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', auth_routes)

if (process.env.PORT) {
    app.use(express.static('../client/dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
}

client.once('open', () => {
    app.listen(PORT, () => console.log('Server started on port', PORT))
})