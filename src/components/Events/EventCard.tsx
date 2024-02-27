import { useEventStore } from "@/lib/stateManagement";
import { Event } from "../../models";
import { useState } from "react";

function EventCard({
  event,
  isSelected,
}: {
  event: Event;
  isSelected: boolean;
}) {
  const changeSelectedEventId = useEventStore(
    (state) => state.changeSelectedEventId
  );

  const updateEventId = () => {
    changeSelectedEventId(event.id);
  };

  return (
    <div
      className={`bg-slate-400 rounded p-3 mx-2 cursor-pointer duration-200 ${
        isSelected
          ? "bg-teal-800 opacity-100 scale-100 text-white"
          : "opacity-70 scale-95 hover:bg-slate-200"
      }`}
      onClick={updateEventId}
    >
      {event.title}
    </div>
  );
}

export default EventCard;
