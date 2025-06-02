
const TaskForm = ({inputValue, onChange, onAdd}) => {
  return (
    <div>
        <input type="text" value={inputValue} onChange={(e) => onChange(e.target.value)}/>
        <button onClick={onAdd}>Добавить</button>
    </div>
  )
}

export default TaskForm
