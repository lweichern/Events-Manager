import { useEventStore } from "@/lib/stateManagement";
import { Event } from "../../models";

function EventCard({ event }: { event: Event }) {
  const changeSelectedEventId = useEventStore(
    (state) => state.changeSelectedEventId
  );

  const updateEventId = () => {
    changeSelectedEventId(event.ID);
  };

  return (
    <div
      className=" bg-slate-400 rounded p-3 mx-2 cursor-pointer"
      onClick={updateEventId}
    >
      {event.title}
    </div>
  );
}

export default EventCard;
