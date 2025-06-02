import Task from "./Task"

const TaskList = ({tasks, onDelete, onToggle}) => {
  return (
      <ul>
        {tasks.map((task) => (
            <Task task={task} onDelete={onDelete} key={task.id} onToggle={onToggle}/>
        ))}
        </ul>
  )
}

export default TaskList
