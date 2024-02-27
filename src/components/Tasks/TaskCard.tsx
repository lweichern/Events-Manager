import { Task } from "../../models";

function TaskCard({ task }: { task: Task }) {
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", `${task.id}`);
    e.dataTransfer.setData("taskType", task.taskType);
  };
  return (
    <div
      className=" bg-slate-400 rounded p-3 mx-2 cursor-pointer"
      draggable
      onDragStart={dragStartHandler}
    >
      {task.title}
    </div>
  );
}

export default TaskCard;
