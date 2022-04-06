import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Link className="btn btn-lg btn-info m-2" to="/">
        Create New Habit
      </Link>
      <Link className="btn btn-lg btn-info m-2" to="/">
        Achievements
      </Link>
    </div>
  );
};

export default Dashboard;
