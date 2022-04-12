// Packages
const { ApolloServer } = require("apollo-server");

// Database
require("./mongooseConfig");

//  Models
const Wilder = require("./models/wilder");

// typeDefs
const typeDefs = require("./graphql/schema/index");

// resolvers
const resolvers = require("./graphql/resolvers/index");

// le serveur apollo est instancié avec les paramètres suivants:
// typeDefs est le schéma de données
// resolvers est le resolveur de données
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
