import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        habits {
          _id
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
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//deletes an instance of a task

export const REMOVE_TASKINSTANCE = gql`
  mutation removeTaskInstance($hIndex: Int!, $tIndex: Int!, $date: String!) {
    removeTaskInstance(hIndex: $hIndex, tIndex: $tIndex, date: $date) {
      _id
      username
      email
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

//deletes task data

export const REMOVE_TASK = gql`
  mutation removeTask($index: String!, $taskId: ID!) {
    removeTask(index: $index, taskId: $taskId) {
      _id
      username
      email
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
        }
      }
    }
  }
`;

// create habit data for a logged in user
export const CREATE_HABIT = gql`
  mutation createHabit($habit: habitInput!) {
    createHabit(input: $habit) {
      _id
      username
      email
      habits {
        title
      }
    }
  }
`;

// update habit data for a logged in user
export const UPDATE_HABIT = gql`
  mutation updateHabit($index: String!, $habit: habitInput!) {
    updateHabit(index: $index, input: $habit) {
      _id
      username
      email
      habits {
        title
      }
    }
  }
`;

// create task data for a logged in user
export const CREATE_TASK = gql`
  mutation createTask($index: String!, $task: taskInput!) {
    createTask(index: $index, input: $task) {
      _id
      username
      email
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
        }
      }
    }
  }
`;

// create taskinstance data for a logged in user
export const CREATE_TASKINSTANCE = gql`
  mutation createTaskInstance(
    $hIndex: Int!
    $input: taskInstanceInput
    $tIndex: Int!
  ) {
    createTaskInstance(hIndex: $hIndex, input: $input, tIndex: $tIndex) {
      _id
      username
      email
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
