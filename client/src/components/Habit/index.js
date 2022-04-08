import "./habit.css";
import Task from "../Task";

const Habit = (props) => {
  if (!props.value) return;
  return (
    <div className="habit-card">
      <div className="habit-title">{props.value.title}</div>
      <div className="habit-body">
        {/* <Task value={props.value.tasks[0]} /> */}
        {props.value?.tasks.map((task, index) => {
          return <Task key={index} value={task} />;
          //   return <p>Here's a task </p>;
        })}
      </div>
    </div>
  );
};

export default Habit;
