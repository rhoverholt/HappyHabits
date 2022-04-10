const { AuthenticationError } = require("apollo-server-express");
const { up } = require("inquirer/lib/utils/readline");
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
      throw new AuthenticationError("You need to be logged in!");
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

    // update a habit to a User
    updateHabit: async (parent, { index, input }, context) => {
      console.log("updating habit: ", index, input);
      if (context.user) {
        if (index < 0)
          throw new AuthenticationError("Cannot update invalid Habit");

        const user = await User.findOne({ _id: context.user._id }).select(
          "-password"
        );
        if (user?.habits?.length > index + 1)
          throw new AuthenticationError("Cannot update invalid Habit");

        // update each habit field as given in input...do not, however, update the createdDate field even if given
        ["title", "status", "notes", "completedDate"].forEach((field) => {
          if (input[field]) user.habits[index][field] = input[field];
        });
        await user.save();
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
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

    // add a task to a habit
    createTask: async (parent, { index, input }, context) => {
      console.log("Create task called: ", index, input);
      if (context.user) {
        if (index < 0)
          throw new AuthenticationError("Cannot add task to invalid habit");

        const updatedUser = await User.findOne({
          _id: context.user._id,
        }).select("-password");

        if (updatedUser?.habits?.length > index + 1)
          throw new AuthenticationError("Cannot add task to invalid habit");

        if (!updatedUser.habits[index]?.tasks)
          updatedUser.habits[index].tasks = [input];
        else updatedUser.habits[index].tasks.push(input);
        await updatedUser.save();
        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // update a task
    updateTask: async (parent, { index, taskId, input }, context) => {
      console.log("Update task called: ", index, taskId, input);
      if (context.user) {
        console.log("Update task called: ", index, taskId, input);
        if (index < 0)
          throw new AuthenticationError("Cannot update task on invalid habit");

        const user = await User.findOne({
          _id: context.user._id,
        }).select("-password");

        if (user?.habits?.length > index + 1)
          throw new AuthenticationError("Cannot update task on invalid habit");

        user.habits[index]?.tasks?.forEach((task) => {
          // only update the specified task
          if (taskId == task.id) {
            ["description", "frequency", "startDate", "endDate"].forEach(
              (field) => {
                if (input[field]) task[field] = input[field]; // only update those fields that are given as input
              }
            );
          }
        });

        await user.save();
        return user;
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
    removeTask: async (parent, { index, taskId }, context) => {
      console.log("remove task called: ", index, taskId);

      if (context.user) {
        if (index < 0)
          throw new AuthenticationError("Cannot add task to invalid habit");

        const user = await User.findOne({
          _id: context.user._id,
        }).select("-password");

        if (user?.habits?.length > index + 1)
          throw new AuthenticationError("Cannot add task to invalid habit");

        user.habits[index]?.tasks?.filter((task) => {
          console.log(task.id, taskId !== task.id);
          return taskId !== task.id;
        });

        user.save();
        return user;
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
