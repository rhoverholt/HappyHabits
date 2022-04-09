const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {

    users: async () => {
      return User.find();
    },

    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
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
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // add a habit to a User
    createHabit: async (parent, { input }, context) => {

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { habits: input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

        // update a habit to a User
        updateHabit: async (parent, { index, input }, context) => {

          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },

              { new: true, runValidators: true }
            );
    
            return updatedUser;
          }
    
          throw new AuthenticationError("You need to be logged in!");
        },

    // add a task to a habit
    createTask: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tasks: input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    // add a taskinstance to a task
    createTaskInstance: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { taskInstance: input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    //remove Task from habit
    removeTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: { taskId: taskId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    //remove TaskInstance from task
    removeTaskInstance: async (parent, { taskInstanceId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { taskInstance: { taskInstanceId: taskInstanceId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
