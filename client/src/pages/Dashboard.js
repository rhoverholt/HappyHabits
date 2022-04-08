import React from "react";
import { Link } from "react-router-dom";
import Habit from "../components/Habit";

const habits = [
  {
    id: "134otyb1234oiuyt103",
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
    id: "134oiutb13o4t",
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

      {habits.map((habit) => {
        return <Habit key={habit.id} value={habit} />;
      })}
    </div>
  );
};

export default Dashboard;
