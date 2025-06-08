import { useEffect, useState, useReducer} from 'react';
import { taskReducer } from './taskReducer';
import { DndContext } from '@dnd-kit/core';

import TaskForm from './Components/taskForm';
import TaskList from './Components/TaskList';
import ViewControls from './Components/ViewControls';

function App() {

  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [filter, setFilter] = useState(localStorage.getItem('filter') || "All");
  const [sortType, setSortType] = useState(localStorage.getItem('sortType') || "Due");
  const [tasks, dispach] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })

  const addTask = () => {
    if (inputValue.trim() === "") {
      alert("Введите задачу");
      return;
    }
    dispach({type: 'ADD_TASK', payload: {
      title: inputValue, 
      dueDate 
    }});
    setInputValue("");
    setDueDate(null);
    console.log("Добавлено: " + inputValue);
  }

  const onChange = (value) => {
    setInputValue(value);
  }

  const onChangeDate = (date) => {
    setDueDate(date);
    console.log(date)
  }

  const onDelete = (id) => {
    dispach({type: 'DELETE_TASK', payload: id})
    console.log("Удалено: " + id);
  }

  const clearAll = () => {
    const confirmed = window.confirm("Вы точно хотите удалить все задачи?");
    if (confirmed) {
      dispach({type: 'DELETE_ALL'})
      console.log("Все удалено!!!");
    }
  }

  const onToggle = (id) => {
  dispach({type: 'TOGGLE_TASK', payload: id})
  console.log("Toggle" + id)
  };

  const onDragEnd = () => {
    
  }

 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter])

  useEffect(() => {
    localStorage.setItem("sortType", sortType);
  }, [sortType])

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Active") return !task.completed;
    return true;
  })

  const filterNoDate = filteredTasks.filter(task => !task.dueDate)
  const filterOrderDate = filteredTasks.filter(task => task.dueDate)

  const sortTaskList = [...filterOrderDate].sort((a, b) => {
    if (sortType === "Created") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortType === "Due") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  })

  return (
    <>
    <h1>Список задач</h1>
    <TaskForm
      clearAll={clearAll} 
      inputValue={inputValue}
      dueDate={dueDate} 
      onAdd={addTask} 
      onChange={onChange} 
      onChangeDate={onChangeDate}
      />
    <ViewControls
      filter={filter}
      setFilter={setFilter}
      sortType={sortType}
      setSortType={setSortType}
      />
      <DndContext onDragEnd={onDragEnd}>
          <TaskList 
          tasksNoDate={filterNoDate} 
          tasks={sortTaskList} 
          onDelete={onDelete} 
          onToggle={onToggle}
        />
      </DndContext>
    
    </>
  )
}

export default App
