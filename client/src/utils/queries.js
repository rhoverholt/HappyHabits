import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      habits{
        title
        status
        notes
        createdDate
        completedDate
        tasks{
          description
          frequency
          startDate
          endDate
          taskInstances{
            dueDate
            status
          }

        }
      }
    }
  }
`;
