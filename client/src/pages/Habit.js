import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {QUERY_ME} from '../utils/queries';
import {CREATE_HABIT, REMOVE_TASK, CREATE_TASK, UPDATE_HABIT} from '../utils/mutations';
import './habit.css'

import Auth from "../utils/auth";

const Habit = () => {
const { loading, data } = useQuery(QUERY_ME);
let { id } = useParams();
let visibility = "btn-block btn-danger Visible btn btn-primary"
if(!id){
    visibility = "btn-block btn-danger Hidden btn btn-primary"

} 

const [createHabit, { error, habit }] = useMutation(CREATE_HABIT);
const [createTask, {  task }] = useMutation(CREATE_TASK);
const [removeTask, {}] = useMutation(REMOVE_TASK);
const [updateHabit, {}] = useMutation(UPDATE_HABIT);
const [formState, setFormState] =  useState({habitTitle:``,
        notes:``,
        description:``,
        frequency:``,
        startDate:``,
        endDate:``});

let userData= data?.me || {};
let addTaskForm=``;


useEffect(() => {
    if(!data){
        return;
    }
    userData = data?.me || {};
 setFormState(
        (id)?
        // {habitTitle: userData.habits[id].title,
        // description: userData.habits[id].tasks[taskId].description,
        // frequency:userData.habits[id].tasks[taskId].frequency,
        // startDate:userData.habits[id].tasks[taskId].startDate,
        // endDate: userData.habits[id].tasks[taskId].endDate} : (id && taskId==='')?
        {habitTitle:userData.habits[id].title,
        notes:userData.habits[id].notes,
        description:``,
        frequency:``,
        startDate:``,
        endDate:``} :
            {habitTitle:``,
            notes:``,
            description:``,
            frequency:``,
            startDate:``,
            endDate:``}
    )}, [data]);


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
    title:formState.habitTitle,
}

if (!id){
    try {
        const { habit } = await createHabit({
          variables: { habit: habitToSave },
        });
        id = data.me.habits.length;
        document.location.replace(`/habit/${id}`);

  
      } catch (e) {
        console.error(e);
      }
}
else if(id){

    try {
        const { habit } = await updateHabit({id,
          variables: { 
              index: id,
              habit: habitToSave },
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
        description:formState.description,
        frequency:formState.frequency,
        startDate:formState.startDate,
        endDate:formState.endDate,

    }

    if(document.getElementById("addTaskForm").className="Visible"){
        document.getElementById("addTaskForm").setAttribute("class","Hidden");
            visibility = "btn-block btn-danger Visible btn btn-primary";
            document.getElementById("newTaskBtn").setAttribute("class",visibility);

    }

    try {
      const { task } = await createTask({
        variables: { 
            index: id,
            task:taskToSave},
      });

    } catch (e) {
      console.error(e);
    }

setFormState(
        {
        description:``,
        frequency:``,
        startDate:``,
        endDate:``} );

        };


  const handleDeleteTask = async (taskId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {

      await removeTask({variables: {
        index: id,
        taskId: taskId}})


      // upon success, remove task from page
    //   removeTaskId(taskId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = async (taskId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {

    //   await updateTask({variables: {taskId: taskId}})


    //   // upon success, remove task from localStorage
    //   removeTaskId(taskId);
    } catch (err) {
      console.error(err);
    }
  };


  const addNewTask = () =>{
    let addTaskForm = document.getElementById("addTaskForm");
    addTaskForm.setAttribute("class","Visible");
    visibility = "btn-block btn-danger Hidden btn btn-primary"
    document.getElementById("newTaskBtn").setAttribute("class",visibility);

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
                  value={formState.habitTitle}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary" id="save-habit"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Save Habit
                </button>
              </form>
              
              <Button id='newTaskBtn' className={visibility} onClick={() => addNewTask()}>
                    Add New Task
                </Button>

            <div id='addTaskForm' className="Hidden">
                <form onSubmit={handleTaskFormSubmit}>
                    <input
                    className="form-input"
                    placeholder="Task Description"
                    name="description"
                    type="text"
                    value={formState.description}
                    onChange={handleChange}
                    />
                    <input
                    className="form-input"
                    placeholder="Task Frequency"
                    name="frequency"
                    type="text"
                    value={formState.frequency}
                    onChange={handleChange}
                    />
                    <input
                    className="form-input"
                    placeholder="Task Start Date"
                    name="startDate"
                    type="date"
                    value={formState.startDate}
                    onChange={handleChange}
                    />
                    <input
                    className="form-input"
                    placeholder="TaskEndDate"
                    name="endDate"
                    type="date"
                    value={formState.endDate}
                    onChange={handleChange}
                    />
                    <button
                    id="taskBtn"
                    className="btn btn-block btn-primary"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    >
                    Save Task
                    </button>
                    </form>
                </div>
 
                <div id="notesForm" className="Visible" >
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
                  className="btn btn-block btn-primary" id="saveMe"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Save Entry
                </button>
              </form>
              </div>
            {userData.habits[id]?.tasks.map((task) => {
            return (


              <Card key={task.taskId} border='dark'>
                <Card.Body>
                  <Card.Title>{task.description}</Card.Title>
                  <Button className='btn-block btn-danger' onClick={() => handleEditTask(task.taskId)}>
                    Edit
                  </Button>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteTask(task.taskId)}>
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