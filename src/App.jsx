import { useEffect, useState } from 'react';

import TaskForm from './Components/taskForm';
import TaskList from './Components/TaskList';

function App() {

  const [inputValue, setInputValue] = useState("")
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })

  const addTask = () => {
    if (inputValue.trim() === "") {
      alert("Введите задачу");
      return;
    }
    setTasks([...tasks, {id: Date.now(), title: inputValue}]);
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

 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])



  return (
    <>

    <h1>Список задач</h1>
    <TaskForm inputValue={inputValue} onAdd={addTask} onChange={onChange}/>
    <TaskList tasks={tasks} onDelete={onDelete}/>
    
    </>
  )
}

export default App
