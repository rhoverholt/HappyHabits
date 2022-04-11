import React from "react";
import { useQuery } from "@apollo/client";
import Habit from "../components/Habit";
import { QUERY_ME } from "../utils/queries";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Habit-Forming Activities</h1>
      <h2 className="dashboard-subtext">Shake Up Your Routine</h2>
      <div className="habit-container">
        {loading
          ? "loading..."
          : data.me.habits.map((habit, index) => {
              return <Habit key={index} index={index} value={habit} />;
            })}
      </div>
    </div>
  );
};

export default Dashboard;
