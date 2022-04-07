import './habit.css'

const Habit = (props) => {
  return (
    <div className="habit-card">
      <div className="habit-title">
        {props.value ? props.value.title : "Here's my habits"}
      </div>
      <div className="habit-title">{props.value.title}</div>
    </div>
  );
};

export default Habit;
