import { useEffect } from "react";
import EventColumn from "../components/Events/EventColumn";
import TaskColumn from "../components/Tasks/TaskColumn";
import { useColumnStore } from "../lib/stateManagement";
import { Column, Task } from "../models";
import { useEventStore } from "@/lib/stateManagement";
import { ArrowLeft } from "lucide-react";

function Home() {
  const fetchColumnData = useColumnStore((state) => state.setColumn);
  const columnData = useColumnStore((state) => state.column);
  const selectedEventId = useEventStore((state) => state.selectedEventId);

  console.log("select event id: ", selectedEventId);

  useEffect(() => {
    fetchColumnData(selectedEventId);
  }, [selectedEventId]);

  return (
    <div className=" h-full">
      <nav className=" flex justify-center items-center bg-teal-700  text-3xl text-white py-5">
        Event Manager
      </nav>

      <div className="flex h-full divide-x-[1px] divide-teal-700">
        <EventColumn />
        {selectedEventId === -1 ? (
          <h3 className=" text-center text-slate-200 opacity-50 w-full text-2xl flex items-center justify-center bounce-text">
            <ArrowLeft /> Select an event
          </h3>
        ) : (
          Object.keys(columnData).map((key, index) => (
            <div key={index}>
              <TaskColumn
                colTitle={key}
                taskList={columnData[key as keyof Column]}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
