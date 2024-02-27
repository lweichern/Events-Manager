import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useEventStore } from "@/lib/stateManagement";

function EventColumn() {
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const events = useEventStore((state) => state.events);
  const selectedEventId = useEventStore((state) => state.selectedEventId);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-1/5 min-w-72 h-full shadow-2xl shadow-teal-700">
      <h4 className=" opacity-50 text-center p-2 text-teal-300 text-2xl">
        Events
      </h4>
      <div className="flex flex-col space-y-2 my-2">
        {events ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSelected={event.id === selectedEventId}
            />
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
}

export default EventColumn;
