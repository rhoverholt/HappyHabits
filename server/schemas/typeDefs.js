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
    title: String
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

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
