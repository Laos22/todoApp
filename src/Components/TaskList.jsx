import Task from "./Task"

const TaskList = ({tasks, onDelete}) => {
  return (
      <ul>
        {tasks.map((task) => (
            <Task task={task} onDelete={onDelete} key={task.id}/>
        ))}
        </ul>
  )
}

export default TaskList
