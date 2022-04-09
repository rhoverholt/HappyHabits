const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    habits: [Habit]
  }
  type Habit {
    _id: ID
    title: String!
    status: String
    notes: String
    createdDate: String
    completedDate: String
    tasks: [Task]
  }

  type Task {
    description: String
    frequency: String
    startDate: String
    endDate: String
    taskInstances: [TaskInstance]
  }

  type TaskInstance {
    dueDate: String
    status: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  input habitInput {
    title: String!
    status: String
    notes: String
    createdDate: String
    completedDate: String
  }

  input taskInput {
    description: String
    frequency: String
    startDate: String
    endDate: String
    taskInstances: [taskInstanceInput]
  }

  input taskInstanceInput {
    dueDate: String
    status: Boolean
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createHabit(input: habitInput): User
    createTask(input: taskInput): User
    createTaskInstance(input: taskInstanceInput): User
    removeTask(taskId: ID!): User
    removeTaskInstance(taskInstanceId: ID!): User
    updateHabit(index: Int!, input: habitInput): User
  }
`;

module.exports = typeDefs;
