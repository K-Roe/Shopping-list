import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

// Names of the Filter Tabs
const FILTER_MAP = {
  All: () => true,
  NeedToBuy: task => !task.completed,
  ShoppingBag: task => task.completed
};

// Maps the Filter tabs in a row
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
const [tasks, setTasks] = useState(props.tasks);
const [filter, setFilter] = useState('All');



function editTask(id, newName) {
  const editedTaskList = tasks.map(task => {
  // if this task has the same ID as the edited task
    if (id === task.id) {
      //
      return {...task, name: newName}
    }
    return task;
  });
  setTasks(editedTaskList);
}


function deleteTask(id) {
  const remainingTasks = tasks.filter(task => id !== task.id);
  setTasks(remainingTasks);
}

function toggleTaskCompleted(id) {
  const updatedTasks = tasks.map(task => {
    // if this task has the same ID as the edited task
    if (id === task.id) {
      // use object spread to make a new object
      // whose `completed` prop has been inverted
      return {...task, completed: !task.completed}
    }
    return task;
  });
  setTasks(updatedTasks);
}

function addTask(name) {
  const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
  setTasks([...tasks, newTask]);
}

const taskList = tasks
.filter(FILTER_MAP[filter])
.map(task => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));


const filterList = FILTER_NAMES.map(name => (
  <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));
 const tasksNoun = taskList.length !== 1 ? 'Items' : 'Item';
 const headingText = `${taskList.length} ${tasksNoun} `;
  return (
    <div className="todoapp stack-large">
      <h1>Shopping List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;