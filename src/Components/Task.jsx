
const Task = ({task, onDelete, onToggle}) => {
    const className = task.completed ? "task completed" : "task";
  return (
    <li className={className} key={task.id}>
        <input type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
        />
        {task.title}
        <button onClick={() => onDelete(task.id)}>Удалить</button>
    </li>
  )
}

export default Task
