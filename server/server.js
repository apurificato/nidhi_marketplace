const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser')

const { context, typeDefs, resolvers } = require('./schema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6969;

// Middleware
app.use(express.json());
app.use(cookieParser());
const client = require('./config/client')

// Serve static files for the client application
if (process.env.PORT) {
    app.use(express.static('../client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
// Apollo Server setup
async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context 
    });

    await server.start();

    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(PORT, () => {
        console.log(`🚀 Express Server ready at`, PORT);
        console.log('GraphQL ready at', server.graphqlPath);
    });
}

client.once('open', () => {
  startServer()
})