import React from "react";
import { Link } from "react-router-dom";
import Habit from "../components/Habit";

const habits = [
  {
    title: "My first habit to change",
    status: "Active",
    notes: "I'm not sure how to progress my first habit!",
    createdDate: "4/6/2022",
    tasks: [
      {
        description: "Task 1",
        frequency: "Daily",
      },
      {
        description: "Task 2",
        frequency: "Weekly",
      },
    ],
  },
  {
    title: "My second habit to change",
    status: "Active",
    notes: "I'm not sure how to progress my first habit!",
    createdDate: "4/6/2022",
    tasks: [
      {
        description: "Task 1",
        frequency: "Daily",
      },
      {
        description: "Task 2",
        frequency: "Weekly",
      },
    ],
  },
];

const Dashboard = () => {
  return (
    <div>
      <h1>Habit-forming Activities:</h1>

      <Habit value={habits[0]} />
      {habits?.forEach((habit) => {
        return <Habit value={habit} />;
      })}
    </div>
  );
};

export default Dashboard;
