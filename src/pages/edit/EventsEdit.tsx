import { useState } from "react";
import { useGlobalContext } from "../../context";
import EventsCard from "./components/EventsCard";
const EventsEdit = () => {
  const { allEventsData } = useGlobalContext();

  const [filter, setFilter] = useState<string>("all");
  const changeFilter = (filt: string) => {
    setFilter(filt);
  };

  return (
    <div className="section-px section-py">
      <div>
        <select
          onChange={(e) => changeFilter(e.target.value)}
          className="p-4 px-6 bg-white border-[#ccc] border border-solid rounded-xl "
        >
          <option className="p-2" value="all">
            All
          </option>
          <option className="p-2" value="Culturals">
            Culturals
          </option>
          <option className="p-2" value="Events">
            Events
          </option>
          <option className="p-2" value="Seminars">
            Seminars
          </option>
          <option className="p-2" value="other">
            Other Events
          </option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-12  gap-4 p-4">
        {allEventsData
          ?.filter((event) => filter === "all" || event.eventType === filter)
          .map((event, index) => (
            <EventsCard
              key={index} // ✅ Always add a unique key
              event={event}
            />
          ))}
      </div>
    </div>
  );
};

export default EventsEdit;
