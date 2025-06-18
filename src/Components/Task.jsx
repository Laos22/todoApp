import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

const Task = ({task, onDelete, onToggle, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDueDate, setNewDueDate] = useState(task.dueDate || "");

    const className = task.completed ? "task completed" : "task";
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id: task.id });

    // console.log("RenderTask " +task.id)
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
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span {...listeners} style={{ cursor: 'grab' }}>☰</span>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <div style={{display: "flex"}}>
            {isEditing ? (
              <>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                />
                <input 
                  type="date" 
                  value={newDueDate} 
                  onChange={(e) => setNewDueDate(e.target.value)} 
                />
                <button onClick={() => {
                  console.log("save")
                  onEdit(task.id, newDueDate, newTitle);
                  setIsEditing(false);
                }}>
                  Сохранить
                </button>
                <button onClick={() => {
                  setIsEditing(false);
                  setNewTitle(task.title);
                  setNewDueDate(task.dueDate || "");
                  }}>Отмена</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <span>Срок: {task.dueDate}</span>
            <span>Создана: {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>

          <button
            onClick={() => setIsEditing(prev => !prev)}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ✎
          </button>

          <button
            onClick={() => {
              onDelete(task.id);
            }}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      </li>
    );
}


export default Task;
