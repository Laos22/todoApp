import Task from "./Task";

const TaskList = ({ tasks, tasksNoDate, onDelete, onToggle }) => {
  return (
    <div>
      {tasksNoDate && tasksNoDate.length > 0 && (
        <>
          <h3>Без даты</h3>
          <ul>
            {tasksNoDate.map((task) => (
              <Task task={task} onDelete={onDelete} key={task.id} onToggle={onToggle} />
            ))}
          </ul>
        </>
      )}

      {tasks && tasks.length > 0 && (
        <>
          <h3>С датой</h3>
          <ul>
            {tasks.map((task) => (
              <Task task={task} onDelete={onDelete} key={task.id} onToggle={onToggle} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskList;
