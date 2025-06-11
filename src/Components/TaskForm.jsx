import React, { useState } from "react";



const TaskForm = ({ onAdd, clearAll}) => {

  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState(null);


  console.log("TaskForm")
  return (
    <div className="taskForm">
      <div>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          <input type="date" value={dueDate || ''} onChange={(e) => setDueDate(e.target.value)}/>
          <button onClick={() => {
            onAdd(inputValue, dueDate)
            setInputValue("")
            setDueDate(null)
            }}>Добавить</button>
      </div>
      <div>
          <button onClick={clearAll}>Очистить все</button>
      </div>
    </div>
  )
}

export default React.memo(TaskForm);
