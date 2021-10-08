const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (_, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        
        return userData
      }
      throw new AuthenticationError('Please Log In.');
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      console.log('HERE!!!!')
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    // login
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No such user.');
      }

      // check for password validation
      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw new AuthenticationError('Password is incorrect.');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_, { bookId, authors,  description, image, link, title }, context) => {
      if (context.user) {
        // find user and add to saved books
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: { bookId, authors,  description, image, link, title } },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('Please Log In.');
    },
    // user can only remove books from their own profile
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      
        return updatedUser;
      }
      throw new AuthenticationError('Please Log In.');
    },
  },
};

module.exports = resolvers;