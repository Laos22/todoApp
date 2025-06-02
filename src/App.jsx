import { useEffect, useState, useReducer} from 'react';
import { taskReducer } from './taskReducer';

import TaskForm from './Components/taskForm';
import TaskList from './Components/TaskList';

function App() {

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("All")
  const [tasks, dispach] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })

  const addTask = () => {
    if (inputValue.trim() === "") {
      alert("Введите задачу");
      return;
    }
    dispach({type: 'ADD_TASK', payload: inputValue});
    setInputValue("");
    console.log("Добавлено: " + inputValue);
  }

  const onChange = (value) => {
    setInputValue(value);
  }

  const onDelete = (id) => {
    dispach({type: 'DELETE_TASK', payload: id})
    console.log("Удалено: " + id);
  }

  const onToggle = (id) => {
  dispach({type: 'TOGGLE_TASK', payload: id})
  console.log("Toggle" + id)
  };

 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Active") return !task.completed;
    return true;
  })

  return (
    <>

    <h1>Список задач</h1>
    <TaskForm inputValue={inputValue} onAdd={addTask} onChange={onChange}/>
    <div>
      <button className={filter === 'All' ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("All")}>All</button>
      <button className={filter === 'Completed' ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("Completed")}>Completed</button>
      <button className={filter === 'Active' ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("Active")}>Active</button>
    </div>
    <TaskList tasks={filteredTasks} onDelete={onDelete} onToggle={onToggle}/>
    
    </>
  )
}

export default App
