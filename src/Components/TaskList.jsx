import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";
import React from "react";

const TaskList = ({ tasks, tasksNoDate, onDelete, onToggle, onEdit }) => {

  // Компонент-зона для задач С ДАТОЙ
const WithDateDrop = ({ children }) => {
  // Хук useDroppable сообщает dnd-kit, что этот div — зона приёма
  // id должен быть уникальным — мы задаём "with-date"
  const { setNodeRef } = useDroppable({ id: "with-date" });

  // setNodeRef — функция, которую мы привязываем к DOM-элементу
  // Именно этот div будет "реальной зоной", куда можно что-то перетащить
  return <div ref={setNodeRef}>{children}</div>;
};

// Компонент-зона для задач БЕЗ ДАТЫ
const NoDateDrop = ({ children }) => {
  // Тоже самое, но другой идентификатор — "no-date"
  const { setNodeRef } = useDroppable({ id: "no-date" });

  // Теперь dnd-kit знает: если задача попадёт в эту зону — это зона "no-date"
  return <div ref={setNodeRef}>{children}</div>;
};

  console.log("Render TaskList")
  return (
    <div>
      <NoDateDrop>
        {tasksNoDate && tasksNoDate.length > 0 && (
        <>
          <h3>Без даты</h3>
          <ul>
            {tasksNoDate.map((task) => (
              <Task task={task} onDelete={onDelete} key={task.id} onToggle={onToggle} onEdit={onEdit} />
            ))}
          </ul>
        </>
      )}
      </NoDateDrop>

      <WithDateDrop>
        {tasks && tasks.length > 0 && (
        <>
          <h3>С датой</h3>
          <ul>
            {tasks.map((task) => (
              <Task task={task} onDelete={onDelete} key={task.id} onToggle={onToggle} onEdit={onEdit}/>
            ))}
          </ul>
        </>
      )}
      </WithDateDrop>
    </div>
  );
};

export default React.memo(TaskList);
