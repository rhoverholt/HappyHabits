import "./habit.css";
import Task from "../Task";
import { Link } from "react-router-dom";

const Habit = (props) => {
  if (!props.value) return;
  return (
    <div className="habit-card">
      <div className="habit-title">
        <Link className="habit-link" to={`/habit/${props.index}`}>
          {props.value.title}
        </Link>
      </div>
      <div className="habit-body">
        {/* <Task value={props.value.tasks[0]} /> */}
        {props.value?.tasks.map((task, index) => {
          return <Task key={index} habitIndex={props.index} index={index} value={task} />;
          //   return <p>Here's a task </p>;
        })}
      </div>
    </div>
  );
};

export default Habit;
