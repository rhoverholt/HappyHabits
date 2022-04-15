import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlotChart from "../PlotChart";
import { useMutation } from "@apollo/client";
import {
  REMOVE_TASKINSTANCE,
  CREATE_TASKINSTANCE,
} from "../../utils/mutations";
import "./task.css";
import "./habit.css";

import {
  getWeekSunday,
  getWeeklyInstanceArray,
  isComplete,
  getCountActiveTasks,
} from "./taskDateFuns";

const Habit = (props) => {
  let habit = JSON.parse(JSON.stringify(props.value));
  const [weeklyDt] = useState(getWeekSunday());

  const removeTaskInstance = useMutation(REMOVE_TASKINSTANCE)[0];
  const createTaskInstance = useMutation(CREATE_TASKINSTANCE)[0];

  function getChartData() {
    const type = "bar";
    const labels = habit.tasks?.map((t, index) => index + 1);
    const backgroundColor = habit.tasks?.map(
      (t, index) =>
        ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"][index % 5]
    );
    const data = habit.tasks?.map((task) =>
      getCountActiveTasks(task, weeklyDt)
    );

    return {
      type,
      data: {
        labels,
        datasets: [
          {
            label: "Number of Times Completed",
            backgroundColor,
            data,
          },
        ],
      },
      options: { title: { display: true, text: "Habit Activity" } },
    };
  }

  const [chartData, setChartData] = useState(getChartData());

  if (!habit)
    return (
      <p>
        You have no habits in progress{" "}
        <Link className="habit-link" to="/habit/">
          click here
        </Link>{" "}
        to create one.
      </p>
    );

  function handleTaskCheckBox(event) {
    const hIndex = parseInt(event.target.attributes.habit.value);
    const tIndex = parseInt(event.target.attributes.task.value);
    const tiDate = event.target.attributes.value.value;
    const tiCompleted = event.target.checked;

    let newTiDate = new Date(tiDate);
    newTiDate = newTiDate.getTime().toString();

    if (tiCompleted) {
      createTaskInstance({
        variables: {
          hIndex,
          tIndex,
          input: { dueDate: tiDate.toString(), status: true },
        },
      });
      habit.tasks[tIndex].taskInstances.push({
        dueDate: newTiDate,
        status: true,
      });
    } else {
      removeTaskInstance({
        variables: { hIndex, tIndex, date: tiDate.toString() },
      });
      habit.tasks[tIndex].taskInstances = habit.tasks[
        tIndex
      ].taskInstances.filter((ti) => ti.dueDate.toString() !== newTiDate);
    }

    setChartData(getChartData());
  }
  return (
    <div className="habit-card">
      <div className="habit-title">
        <Link className="habit-link" to={`/habit/${props.index}`}>
          {habit.title}
        </Link>
      </div>
      <div className="habit-body">
        <div className="chart-container">
          <PlotChart
            data={chartData.data}
            type={chartData.type}
            options={chartData.options}
          />
        </div>
        {habit?.tasks.map((task, tIndex) => {
          return (
            <div key={tIndex} className="task-card">
              <div className="task-title">
                {tIndex + 1}. {task.description}
              </div>
              <div className="task-body">
                {task.frequency === "Daily" ? (
                  <div className="task-input">
                    {
                      /* fancy way to create 7 checkboxes, 1 for each Day of Week (dOw) */
                      getWeeklyInstanceArray(weeklyDt).map(({ dow, date }) => {
                        return (
                          <label key={dow} className="task-label tl-daily">
                            {dow}
                            <input
                              type="checkbox"
                              key={dow}
                              value={date}
                              task={tIndex}
                              habit={props.index}
                              defaultChecked={isComplete(
                                task.taskInstances,
                                date
                              )}
                              onChange={handleTaskCheckBox}
                            ></input>
                          </label>
                        );
                      })
                    }
                  </div>
                ) : task.frequency === "Weekly" ? (
                  <label className="task-label tl-weekly">
                    Weekly
                    <input
                      type="checkbox"
                      value={new Date(weeklyDt)}
                      task={tIndex}
                      habit={props.index}
                      defaultChecked={isComplete(
                        task.taskInstances,
                        new Date(weeklyDt)
                      )}
                      onChange={handleTaskCheckBox}
                    ></input>
                  </label>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Habit;
