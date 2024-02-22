import { useEffect } from "react";
import EventCard from "./EventCard";
import { useEventStore } from "@/lib/stateManagement";

function EventColumn() {
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const events = useEventStore((state) => state.events);
  const selectedEventId = useEventStore((state) => state.selectedEventId);

  console.log("selected event id: ", selectedEventId);
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-1/5 min-w-72 h-full">
      <h4 className="text-slate-200 opacity-50 text-center p-2">Events</h4>
      <div className="flex flex-col space-y-2 my-2">
        {events ? (
          events.map((event) => <EventCard key={event.ID} event={event} />)
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
}

export default EventColumn;
