const TaskForm = ({inputValue, dueDate, onChange, onChangeDate, onAdd}) => {


  return (
    <div>
        <input type="text" value={inputValue} onChange={(e) => onChange(e.target.value)}/>
        <input type="date" value={dueDate || ''} onChange={(e) => onChangeDate(e.target.value)}/>
        <button onClick={onAdd}>Добавить</button>
    </div>
  )
}

export default TaskForm
