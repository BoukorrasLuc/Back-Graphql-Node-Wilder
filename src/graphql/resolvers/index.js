// Models
const Wilder = require("../../models/wilder");

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
        skills: args.skills,
      });
      await wilder.save();
      return wilder;
    },
    deleteWilder: async (parent, args) => {
      await Wilder.findByIdAndDelete(args.id);
      return { id: args.id };
    },
    updateWilder: async (parent, args) => {
      const wilder = await Wilder.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
          city: args.city,
          skills: args.skills,
        },
        { new: true }
      );
      return wilder;
    },
  },
};

module.exports = resolvers;
