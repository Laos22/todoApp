import { useDraggable } from "@dnd-kit/core";

const Task = ({task, onDelete, onToggle}) => {
    const className = task.completed ? "task completed" : "task";
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id: task.id });
  
    return (
    <li className={className} 
    key={task.id}
    ref={setNodeRef}
    {...attributes}
    style={{
      position: 'relative',
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
      zIndex: transform ? 999 : 'auto',
      boxShadow: transform ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
      borderRadius: '6px',
    }}
    >
      <div
        {...listeners}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span>{task.title}</span>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "0.8rem",
          color: "#555",
          paddingRight: "60px" // отступ для кнопок
        }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Срок: {task.dueDate}</span>
            <span>Создана: {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          onDelete(task.id);
        }}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '4px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          padding: '2px 6px',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        ✕
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          alert("Редактировать пока не реализовано");
        }}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '40px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          padding: '2px 6px',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        ✎
      </button>
    </li>
  )
}

export default Task
