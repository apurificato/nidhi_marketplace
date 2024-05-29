require('dotenv').config()
const express = require('express')
const path = require('path')
const { ApolloServer, gql } = require('apollo-server-express')

const app = express()
const PORT = process.env.PORT || 6969



// graphql schema
const typeDefs = gql`

type Product {
    _id: ID
    name: String,
    username: User,
    bid: Bid,
},
type Bid {
    _id: ID
    username: User,
    bid: Int,
    product: Product
},
type User {
    username: String,
    _id: ID
    email: String,
    password: String,
    bid: [Bid]
},
type Query {
    hello: String,
    someMethod: Int,
    getUser: User
}
`

// schema functions
const resolvers = {
    Query: {
        hello() {
          return  "Hello World"
        },
        getUser() {
            return {
                _id: '123',
                username: 'cenzo',
                email: 'email@test.com',
                password: "password1"
            
            }
        }

    }
    // Mutation: {
       
    //     } 
    }



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


// mongoose + ApolloServer initialization 
async function startServer() {
    const server = new ApolloServer({typeDefs, resolvers})
    
    await server.start()

    server.applyMiddleware({ app})

    client.once('open', () => {
    
        app.listen(PORT, () => {
            
        console.log('Server started on port', PORT)
    
        console.log('GraphQL ready at', server.graphqlPath)
    })
    })
}


startServer()
