// import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  REMOVE_TASKINSTANCE,
  CREATE_TASKINSTANCE,
} from "../../utils/mutations";
import "./task.css";
const mSecondsPerDay = 1000 * 60 * 60 * 24; // milliseconds per day

const Task = (props) => {
  // const [
  //   removeTaskInstance,
  //   { data: rmData, loading: rmLoading, error: rmError },
  // ] = useMutation(REMOVE_TASKINSTANCE);

  const removeTaskInstance = useMutation(REMOVE_TASKINSTANCE)[0];
  // const [
  //   createTaskInstance,
  //   { data: crData, loading: crLoading, error: crError },
  // ] = useMutation(CREATE_TASKINSTANCE);
  const createTaskInstance = useMutation(CREATE_TASKINSTANCE)[0];

  if (!props.value) return null;

  let weeklyDt = Date.now();

  let dt = cleanDate(weeklyDt);
  dt = new Date(dt - dt.getDay() * mSecondsPerDay);

  weeklyDt = dt.getTime();

  function cleanDate(dateTime) {
    let d =
      typeof dateTime === Object ? dateTime : new Date(parseInt(dateTime));

    return new Date( // convert input date-time to a simple date with no time
      d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()
    );
  }
  function getWeeklyInstanceArray(dateTime) {
    const date = cleanDate(dateTime);

    const sunday = new Date(date - date.getDay() * mSecondsPerDay);

    return ["S", "M", "Tu", "W", "Th", "F", "Sa"].map((dow, index) => {
      return { dow, date: new Date(sunday - -index * mSecondsPerDay) };
    });
  }

  function isComplete(taskInterfaces, date) {
    return taskInterfaces.some(
      // if a date-match exists, return true
      (ti) => cleanDate(ti.dueDate).toString() === date.toString()
    );
  }

  function handleCheckBox(event) {
    const hIndex = parseInt(event.target.attributes.habit.value);
    const tIndex = parseInt(event.target.attributes.task.value);
    const tiDate = event.target.attributes.value.value;
    const tiCompleted = event.target.checked;

    console.log(hIndex, tIndex, tiDate, tiCompleted);

    if (tiCompleted)
      createTaskInstance({
        variables: {
          hIndex,
          tIndex,
          input: { dueDate: tiDate.toString(), status: true },
        },
      });
    else
      removeTaskInstance({
        variables: { hIndex, tIndex, date: tiDate.toString() },
      });
  }

  return (
    <div className="task-card">
      <div className="task-title">{props.index+1}. {props.value.description}</div>
      <div className="task-body">
        {props.value.frequency === "Daily" ? (
          <div className="task-input">
            {
              /* fancy way to create 7 checkboxes, 1 for each Day of Week (dOw) */
              getWeeklyInstanceArray(weeklyDt).map(({ dow, date }, index) => {
                return (
                  <label key={dow} className="task-label tl-daily">
                    {dow}
                    <input
                      type="checkbox"
                      key={dow}
                      value={date}
                      task={props.index}
                      habit={props.habitIndex}
                      defaultChecked={isComplete(
                        props.value.taskInstances,
                        date
                      )}
                      onChange={handleCheckBox}
                    ></input>
                  </label>
                );
              })
            }
          </div>
        ) : props.value.frequency === "Weekly" ? (
          <label className="task-label tl-weekly">
            Weekly
            <input
              type="checkbox"
              value={new Date(weeklyDt)}
              task={props.index}
              habit={props.habitIndex}
              defaultChecked={isComplete(
                props.value.taskInstances,
                new Date(weeklyDt)
              )}
              onChange={handleCheckBox}
            ></input>
          </label>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Task;
