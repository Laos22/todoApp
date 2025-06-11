import { useEffect, useState, useReducer, useCallback, useMemo} from 'react';
import { taskReducer } from './taskReducer';
import { DndContext } from '@dnd-kit/core';

import TaskForm from './Components/taskForm';
import TaskList from './Components/TaskList';
import ViewControls from './Components/ViewControls';

function App() {

  const [filter, setFilter] = useState(localStorage.getItem('filter') || "All");
  const [sortType, setSortType] = useState(localStorage.getItem('sortType') || "Due");
  const [tasks, dispach] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })

  const addTask = useCallback((inputValue, dueDate) => {
    if (inputValue.trim() === "") {
      alert("Введите задачу");
      return;
    }
    dispach({type: 'ADD_TASK', payload: {
      title: inputValue, 
      dueDate 
    }});
    console.log("Добавлено: " + inputValue);
  }, [dispach])

  const onDelete = useCallback((id) => {
    dispach({type: 'DELETE_TASK', payload: id})
    console.log("Deleted: " + id);
  }, [dispach])

  const clearAll = useCallback(() => {
    const confirmed = window.confirm("Вы точно хотите удалить все задачи?");
    if (confirmed) {
      dispach({type: 'DELETE_ALL'})
      console.log("Все удалено!!!");
    }
  }, [dispach])

  const onToggle = useCallback((id) => {
  dispach({type: 'TOGGLE_TASK', payload: id})
  }, [dispach]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // если не попал ни в какую зону — ничего не делаем

    // const fromId = active.id;
    const toZone = over.id;

    if (toZone === "no-date") {
  const draggedTask = tasks.find(t => t.id === active.id);
  if (draggedTask?.dueDate) {
    dispach({ type: "DELETE_DUE_DATE", payload: active.id });
    console.log("Перетаскиваем:", draggedTask.title, "в зону:", toZone);
  }
}

    if (toZone === "with-date") {
      console.log("Drag to zone with date")
      // Пока ничего не делаем, можно позже добавить выбор даты
    }
  };

 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter])

  useEffect(() => {
    localStorage.setItem("sortType", sortType);
  }, [sortType])

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Active") return !task.completed;
    return true;
  })
  }, [tasks, filter])

  const filterNoDate = useMemo(() => filteredTasks.filter(task => !task.dueDate), [filteredTasks]);
  const filterOrderDate = useMemo(() => filteredTasks.filter(task => task.dueDate), [filteredTasks]);

  const sortTaskList = useMemo(() => {
    return [...filterOrderDate].sort((a, b) => {
    if (sortType === "Created") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortType === "Due") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
    })
  }, [filterOrderDate, sortType] )

  console.log("Render App")
  return (
    <>
    <h1>Список задач</h1>
    <TaskForm
      clearAll={clearAll} 
      onAdd={addTask} 
      />
    <ViewControls
      filter={filter}
      setFilter={setFilter}
      sortType={sortType}
      setSortType={setSortType}
      />
      <DndContext onDragEnd={handleDragEnd}>
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
