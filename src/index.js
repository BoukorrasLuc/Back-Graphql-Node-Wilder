const { ApolloServer, gql } = require("apollo-server");
require("./mongooseConfig");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const wilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});

const Wilder = mongoose.model("wilder", wilderSchema);

const typeDefs = gql`
  type Wilder {
    id: ID
    name: String
    city: String
    skills: [Skills]
  }

  type Skills {
    title: String
    votes: Int
  }

  type Query {
    # trouver tous les wilders
    getWilders: [Wilder]
    # trouver le wilder par rapport a son id
    getWilder(id: ID!): Wilder
  }

  type Mutation {
    # ajouter un wilder
    addWilder(name: String!, city: String!): Wilder

    # supprimer un wilder
    deleteWilder(id: ID!): Wilder

    # modifier un wilder
    updateWilder(id: ID!, name: String, city: String): Wilder
  }
`;

const resolvers = {
  Query: {
    getWilders: async () => await Wilder.find({}).exec(),
    getWilder: async (parent, args) => await Wilder.findById(args.id).exec(),
  },
  Mutation: {
    addWilder: async (parent, args) => {
      const wilder = new Wilder({
        name: args.name,
        city: args.city,
      });
      await wilder.save();
      return wilder;
    },
    deleteWilder: async (parent, args) => {
      await Wilder.findByIdAndDelete(args.id);
      return { id: args.id };
    },
    updateWilder: async (parent, args) => {
      const wilder = await Wilder.findByIdAndUpdate(args.id, args, {
        new: true,
      });
      return wilder;
    },
  },
};

// le serveur apollo est instancié avec les paramètres suivants:
// typeDefs est le schéma de données
// resolvers est le resolveur de données
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
