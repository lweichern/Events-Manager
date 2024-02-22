import { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../../models";
import { useColumnStore } from "../../lib/stateManagement";
import { TaskFormPopup } from "./TaskFormPopup";

function TaskColumn({
  colTitle,
  taskList,
}: {
  colTitle: string;
  taskList: Task[];
}) {
  const [activeCol, setActiveCol] = useState<boolean>(false);
  const updatedColTitle = colTitle.replace("-", "").toLowerCase();
  const updateTaskType = useColumnStore((state) => state.updateTaskType);

  const dropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActiveCol(false);

    const taskId = e.dataTransfer.getData("taskId");
    const taskType = e.dataTransfer.getData("taskType");

    if (taskType === updatedColTitle) {
      return;
    }

    // await axios.patch(`/api/tasks/${taskId}`, { tasktype: updatedColTitle });

    updateTaskType(taskId, updatedColTitle);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActiveCol(true);
  };

  const dragLeaveHandler = () => {
    setActiveCol(false);
  };

  return (
    <div
      className={`w-1/5 min-w-72 h-full ${activeCol && "bg-slate-500"}`}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
    >
      <div className="text-slate-200 opacity-50 text-center p-2 flex justify-between items-center">
        <div></div>
        <h4>{colTitle}</h4>
        {/* <div className="cursor-pointer text-2xl">+</div> */}
        <TaskFormPopup />
      </div>

      <div className="flex flex-col space-y-2 my-2">
        {taskList ? (
          taskList.map((task) => <TaskCard key={task.ID} task={task} />)
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
