// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskTable from './Components/TaskTable';
import AddTaskForm from './Components/AddTaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Task List Manager</h1>
      <AddTaskForm onAdd={handleAddTask} />
      <TaskTable tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
