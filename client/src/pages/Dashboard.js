import React from "react";
import { useQuery } from "@apollo/client";
import Habit from "../components/Habit";
import { QUERY_ME } from "../utils/queries";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-title">Your Personal Dashboard is Designed to</h3>
      <h2 className="dashboard-subtext">Shake Up Your Routine</h2>
      <div className="habit-container">
        {loading ? (
          "loading..."
        ) : data.me.habits?.length > 0 ? (
          data.me.habits.map((habit, index) => {
            return <Habit key={index} index={index} value={habit} />;
          })
        ) : (
          <Habit />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
