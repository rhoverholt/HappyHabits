import "./habit.css";
import Task from "../Task";
import { Link } from "react-router-dom";
import PlotChart from '../TestChart';


const Habit = (props) => {
  if (!props.value) return;

  const Labels = props.value.tasks.map((task,index)=> index+1)

  const barChartConfig = {
    type: 'bar',
    data: {
      labels: Labels,
      datasets: [
        {
          label: "Number of Times Completed",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f", "#c45850"],
          data: [2478,5267,734, 433]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Habit Activity'
      }
    }
  }




  return (
    <div className="habit-card">
      <div className="habit-title">
        <Link className="habit-link" to={`/habit/${props.index}`}>
          {props.value.title}
        </Link>
      </div>
      <div className="habit-body">
      <div className="chart-container">
       <h3>Bar Chart</h3>
          <PlotChart data={barChartConfig.data} type={barChartConfig.type} options={barChartConfig.options}/>
    </div>
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
