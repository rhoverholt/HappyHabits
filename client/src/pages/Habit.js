import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { QUERY_ME } from "../utils/queries";

import {
  CREATE_HABIT,
  REMOVE_TASK,
  CREATE_TASK,
  UPDATE_HABIT,
  UPDATE_TASK,
} from "../utils/mutations";
import "./habit.css";

import Auth from "../utils/auth";
import context from "react-bootstrap/esm/AccordionContext";

const Habit = () => {
  const { loading, data } = useQuery(QUERY_ME);
  let { id } = useParams();
  let visibility = "btn-block btn-danger Visible btn btn-primary";
  if (!id) {
    visibility = "btn-block btn-danger Hidden btn btn-primary";
  }
  // let myTaskIndex = '';

  const [createHabit, { error, habit }] = useMutation(CREATE_HABIT);
  const [createTask, { task }] = useMutation(CREATE_TASK);
  const [removeTask, {}] = useMutation(REMOVE_TASK);
  const [updateHabit, {}] = useMutation(UPDATE_HABIT);
  const [updateTask, {}] = useMutation(UPDATE_TASK);
  const [formState, setFormState] = useState({
    habitTitle: ``,
    notes: ``,
    description: ``,
    frequency: ``,
    startDate: ``,
    endDate: ``,
    taskIndex: ``,
  });

  let userData = data?.me || {};
  let addTaskForm = ``;

  useEffect(() => {
    if (!data) {
      return;
    }
    userData = data?.me || {};
    setFormState(
      id
        ? // {habitTitle: userData.habits[id].title,
          // description: userData.habits[id].tasks[taskId].description,
          // frequency:userData.habits[id].tasks[taskId].frequency,
          // startDate:userData.habits[id].tasks[taskId].startDate,
          // endDate: userData.habits[id].tasks[taskId].endDate} : (id && taskId==='')?
          {
            habitTitle: userData.habits[id].title,
            notes: userData.habits[id].notes,
            description: ``,
            frequency: `Daily`,
            startDate: ``,
            endDate: ``,
            taskIndex: ``,
          }
        : {
            habitTitle: ``,
            notes: ``,
            description: ``,
            frequency: `Daily`,
            startDate: ``,
            endDate: ``,
            taskIndex: ``,
          }
    );
  }, [data]);

  function cleanDate(dateTime) {
    let d = new Date(parseInt(dateTime));
    return new Date( // convert input date-time to a simple date with no time
      d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleHabitFormSubmit = async (event) => {
    event.preventDefault();
    const habitToSave = {
      title: formState.habitTitle,
      notes: formState.notes,
    };

    if (!id) {
      try {
        const { habit } = await createHabit({
          variables: { habit: habitToSave },
        });

        id = data.me.habits.length;
        window.location.href = "/dashboard";
        // document.location.replace(`/dashboard`);
      } catch (e) {
        console.error(e);
      }
    } else if (id) {
      try {
        const { habit } = await updateHabit({
          id,
          variables: {
            index: id,
            habit: habitToSave,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  //Create a task
  const handleTaskFormSubmit = async (event) => {
    event.preventDefault();
    const taskToSave = {
      description: formState.description,
      frequency: formState.frequency,
      startDate: formState.startDate,
      endDate: formState.endDate,
    };
    let myTaskIndex = formState.taskIndex;
    let myTaskIndexStr = JSON.stringify(myTaskIndex);

    if (myTaskIndexStr === `""`) {
      try {
        const { task } = await createTask({
          variables: {
            index: id,
            task: taskToSave,
          },
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const { task } = await updateTask({
          variables: {
            index: id,
            taskIndex: myTaskIndexStr,
            task: taskToSave,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }

    console.log(myTaskIndexStr);

    setFormState({
      description: ``,
      frequency: `Daily`,
      startDate: ``,
      endDate: ``,
      taskIndex: ``,
    });

    if ((document.getElementById("addTaskForm").className = "Visible")) {
      document.getElementById("addTaskForm").setAttribute("class", "Hidden");
      visibility = "btn-block btn-danger Visible btn btn-primary";
      document.getElementById("newTaskBtn").setAttribute("class", visibility);
    }
  };

  const handleDeleteTask = async (taskIndex) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // const taskIndexString = JSON.parse(taskIndex);
    if (!token) {
      return false;
    }

    try {
      await removeTask({
        variables: {
          index: id,
          taskIndex: taskIndex,
        },
      });

      // upon success, remove task from page
      //   removeTaskId(taskId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = async (
    clickedTaskIndex,
    taskDesc,
    taskFreq,
    taskStart,
    taskEnd
  ) => {
    let updatedStart = cleanDate(taskStart).toLocaleDateString("en-CA");
    let updatedEnd = cleanDate(taskEnd).toLocaleDateString("en-CA");
    // myTaskIndex=clickedTaskIndex;

    console.log(clickedTaskIndex);

    setFormState({
      description: taskDesc,
      frequency: taskFreq,
      startDate: updatedStart,
      endDate: updatedEnd,
      taskIndex: clickedTaskIndex,
    });

    const thisTaskToSave = {
      description: formState.description,
      frequency: formState.frequency,
      startDate: formState.startDate,
      endDate: formState.endDate,
      taskIndex: formState.taskIndex,
    };

    console.log(thisTaskToSave);

    // addTaskForm.setAttribute("class","Visible");
    visibility = "btn-block btn-danger Hidden btn btn-primary";
    document.getElementById("newTaskBtn").setAttribute("class", visibility);
    let addTaskForm = document.getElementById("addTaskForm");
    addTaskForm.setAttribute("class", "Visible");
  };

  const addNewTask = () => {
    let addTaskForm = document.getElementById("addTaskForm");
    addTaskForm.setAttribute("class", "Visible");
    visibility = "btn-block btn-danger Hidden btn btn-primary";
    document.getElementById("newTaskBtn").setAttribute("class", visibility);

    setFormState({
      description: ``,
      frequency: `Daily`,
      startDate: ``,
      endDate: ``,
      taskIndex: ``,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form className="habit-form" onSubmit={handleHabitFormSubmit}>
        <input
          className="form-input"
          placeholder="Habit Title"
          name="habitTitle"
          type="text"
          required
          value={formState.habitTitle}
          onChange={handleChange}
        />
        <button
          className="btn btn-block btn-primary"
          id="save-habit"
          style={{ cursor: "pointer" }}
          type="submit"
        >
          Save Habit
        </button>
      </form>

      <Button
        id="newTaskBtn"
        className={visibility}
        onClick={() => addNewTask()}
      >
        Add New Task
      </Button>

      <div id="addTaskForm" className="Hidden">
        <form onSubmit={handleTaskFormSubmit}>
          <input
            className="form-input"
            placeholder="Task Description"
            name="description"
            type="text"
            required
            value={formState.description}
            onChange={handleChange}
          />
          <select
            className="form-select"
            name="frequency"
            value={formState.frequency}
            onChange={handleChange}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
          <input
            className="form-input"
            placeholder="Task Start Date"
            name="startDate"
            type="date"
            required
            value={formState.startDate}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="TaskEndDate"
            name="endDate"
            type="date"
            required
            value={formState.endDate}
            onChange={handleChange}
          />
          <input
            className="Hidden form-input"
            placeholder="taskIndex"
            name="taskIndex"
            type="text"
            value={formState.taskIndex}
            onChange={handleChange}
          />
          <button
            id="taskBtn"
            className="btn btn-block btn-primary"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Save Task
          </button>
        </form>
      </div>

      <div id="notesForm" className="Visible">
        <form id="notesEntry" onSubmit={handleHabitFormSubmit}>
          <input
            className="form-input"
            placeholder="notes"
            name="notes"
            type="message"
            value={formState.notes}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            id="saveMe"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Save Entry
          </button>
        </form>
      </div>
      {userData.habits[id]?.tasks.map((task, index) => {
        return (
          <Card key={index} border="dark">
            <Card.Body className="whattocall">
              <Card.Title className="card-title">{task.description}</Card.Title>
              <Button
                className="btn-block btn-danger"
                id="edit"
                onClick={() =>
                  handleEditTask(
                    index,
                    task.description,
                    task.frequency,
                    task.startDate,
                    task.endDate
                  )
                }
              >
                Edit
              </Button>
              <Button
                className="btn-block btn-danger"
                id="delete"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default Habit;
