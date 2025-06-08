const TaskForm = ({inputValue, dueDate, onChange, onChangeDate, onAdd, clearAll}) => {


  return (
    <div className="taskForm">
      <div>
          <input type="text" value={inputValue} onChange={(e) => onChange(e.target.value)}/>
          <input type="date" value={dueDate || ''} onChange={(e) => onChangeDate(e.target.value)}/>
          <button onClick={onAdd}>Добавить</button>
      </div>
      <div>
          <button onClick={clearAll}>Очистить все</button>
      </div>
    </div>
  )
}

export default TaskForm
