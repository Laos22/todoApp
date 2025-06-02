import { useEffect, useState } from 'react';

import TaskForm from './Components/taskForm';
import TaskList from './Components/TaskList';

function App() {

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("All")
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })

  const addTask = () => {
    if (inputValue.trim() === "") {
      alert("Введите задачу");
      return;
    }
    setTasks([...tasks, {id: Date.now(), title: inputValue, completed: false}]);
    setInputValue("");
    console.log("Добавлено: " + inputValue);
  }

  const onChange = (value) => {
    setInputValue(value);
  }

  const onDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    console.log("Удалено: " + id);
  }

  const onToggle = (id) => {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ));
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
