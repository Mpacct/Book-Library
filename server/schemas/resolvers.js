const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
  },
  
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        return await User.findbyIdandUpdate(
          {_id: context.user._id }, 
          {$addToSet: { savedBooks: input } },
          { new: true })
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return await User.findbyIdandUpdate(
          {_id: context.user._id }, 
          {$pull: { savedBooks: {bookId} } },
          { new: true })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;