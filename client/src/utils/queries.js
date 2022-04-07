import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      username
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

