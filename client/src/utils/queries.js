import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      username
      email
      notify
      _id
      habits {
        title
        status
        notes
        createdDate
        completedDate
        tasks {
          description
          frequency
          startDate
          endDate
          taskInstances {
            dueDate
            status
          }
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      username
      notify
      email
      _id
      habits {
        title
        status
        notes
        createdDate
        completedDate
        tasks {
          description
          frequency
          startDate
          endDate
          taskInstances {
            dueDate
            status
          }
        }
      }
    }
  }
`;




export const QUERY_ME = gql`
  query me {
    me{
      username
      email
      notify
      _id
      habits {
        title
        status
        notes
        createdDate
        completedDate
        tasks {
          description
          frequency
          startDate
          endDate
          taskInstances {
            dueDate
            status
          }
        }
      }
    }
  }
`;

