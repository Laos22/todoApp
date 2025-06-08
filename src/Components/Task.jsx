
const Task = ({task, onDelete, onToggle}) => {
    const className = task.completed ? "task completed" : "task";
  return (
    <li className={className} key={task.id}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ flex: 1 }}>{task.title}</span>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px", marginRight: "10px", fontSize: "0.8rem", color: "#555" }}>
        <span>Срок: {task.dueDate}</span>
        <span>Создана: {new Date(task.createdAt).toLocaleDateString()}</span>
      </div>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </li>
  )
}

export default Task
