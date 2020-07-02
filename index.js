const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require('express');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('graphql-tools');

const { authMiddleware, requestLimitValidation } = require('./src/middlewares');
const { typeDefs } = require('./src/types');
const { resolvers } = require('./src/resolvers');
const { permissionsMiddleWare } = require('./src/rules');

// Express app
const app = express();

// bodyparser
app.use(bodyParser.json());

// The order is important. In this way the requestLimitValidation function can access user information from jwt token
app.use(authMiddleware);
// app.use(requestLimitValidation);

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaMiddleware = applyMiddleware(schema, permissionsMiddleWare);

const createContext = ({ req }) => {
  return { user: req.user || null }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema: schemaMiddleware,
  context: createContext
});


// Apply middelwares
server.applyMiddleware({
  app
});

// The `listen` method launches a web server.
app.listen({ port: 3000 }, () => {
  console.log(`🚀  Server ready at  http://localhost:3000${server.graphqlPath}`);
});
