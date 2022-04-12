// Packages
const { ApolloServer } = require("apollo-server");

// Database
require("./mongooseConfig");

// Models
// const { Wilder } = require("./models/wilder");

// typeDefs
const typeDefs = require("./graphql/schema/index");

// resolvers
const resolvers = require("./graphql/resolvers/index");

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const wilderSchema = new Schema({
//   name: { type: String, unique: true },
//   city: String,
//   skills: [{ title: String, votes: Number }],
// });

// const Wilder = mongoose.model("wilder", wilderSchema);

// const typeDefs = gql`
//   type Wilder {
//     id: ID
//     name: String
//     city: String
//     skills: [Skills]
//   }

//   type Skills {
//     title: String
//     votes: Int
//   }

//   # input est un objet qui contient les champs de l'objet
//   input SpecialsSkills {
//     title: String
//     votes: Int
//   }

//   type Query {
//     # trouver tous les wilders
//     getWilders: [Wilder]
//     # trouver le wilder par rapport a son id
//     getWilder(id: ID): Wilder
//   }

//   type Mutation {
//     # ajouter un wilder
//     addWilder(name: String, city: String, skills: [SpecialsSkills]): Wilder

//     # supprimer un wilder
//     deleteWilder(id: ID): Wilder

//     # modifier un wilder
//     updateWilder(
//       id: ID
//       name: String
//       city: String
//       skills: [SpecialsSkills]
//     ): Wilder
//   }
// `;

// const resolvers = {
//   Query: {
//     getWilders: async () => await Wilder.find({}).exec(),
//     getWilder: async (parent, args) => await Wilder.findById(args.id).exec(),
//   },
//   Mutation: {
//     addWilder: async (parent, args) => {
//       const wilder = new Wilder({
//         name: args.name,
//         city: args.city,
//         skills: args.skills,
//       });
//       await wilder.save();
//       return wilder;
//     },
//     deleteWilder: async (parent, args) => {
//       await Wilder.findByIdAndDelete(args.id);
//       return { id: args.id };
//     },
//     updateWilder: async (parent, args) => {
//       const wilder = await Wilder.findByIdAndUpdate(
//         args.id,
//         {
//           name: args.name,
//           city: args.city,
//           skills: args.skills,
//         },
//         { new: true }
//       );
//       return wilder;
//     },
//   },
// };

// le serveur apollo est instancié avec les paramètres suivants:
// typeDefs est le schéma de données
// resolvers est le resolveur de données
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
