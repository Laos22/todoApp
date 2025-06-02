
const Task = ({task, onDelete}) => {
  return (
    <li key={task.id}>
        {task.title}
        <button onClick={() => onDelete(task.id)}>Удалить</button>
    </li>
  )
}

export default Task
