require('dotenv').config()
const express = require('express')
const path = require('path')


const app = express()
const PORT = process.env.PORT || 6969

const { ApolloServer } = require('apollo-server-express')

const resolvers = require('./schema/resolvers')
const typeDefs = require('./schema/typeDefs')

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

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers })
  
    await server.start()
  
    server.applyMiddleware({ app })
  
    app.listen(PORT, () => {
      console.log(`🚀 Express Server ready at`, PORT)
  
      console.log('GraphQL ready at', server.graphqlPath)
    })
  }

client.once('open', () => {
    startServer()
})