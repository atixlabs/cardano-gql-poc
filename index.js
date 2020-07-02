const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');

const { authMiddleware, requestLimitValidation } = require('./src/middlewares');
const { typeDefs } = require('./src/types');
const { resolvers } = require('./src/resolvers');

// Express app
const app = express();

// bodyparser
app.use(bodyParser.json());

// The order is important. In this way the requestLimitValidation function can access user information from jwt token
app.use(authMiddleware);
app.use(requestLimitValidation);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs, resolvers, context: ({ req }) => {
    return { user: req.user }
  }
});

// Apply middelwares
server.applyMiddleware({
  app
});

// The `listen` method launches a web server.
app.listen({ port: 3000 }, () => {
  console.log(`🚀  Server ready at  http://localhost:3000${server.graphqlPath}`);
});
