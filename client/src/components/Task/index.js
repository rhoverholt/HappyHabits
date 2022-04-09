import './task.css'

const Task = (props) => {
  //   if (!props.value) return null;

  return (
    <div className="task-card">
      <div className="task-title">{props.value.description}</div>
      <div className="task-body">
        {props.value.frequency === "Daily" ? (
          <div className="task-input">
            {
              /* fancy way to create 7 checkboxes, 1 for each Day of Week (dOw) */
              ["S", "M", "Tu", "W", "Th", "F", "Sa"].map((dOw) => {
                return (
                  <label className="task-label">
                    {dOw}
                    <input type="checkbox" key={dOw} value={dOw}></input>
                  </label>
                );
              })
            }
          </div>
        ) : props.value.frequency === "Weekly" ? (
          <label className="task-label">
            Weekly<input type="checkbox" value="Weekly"></input>
          </label>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Task;
