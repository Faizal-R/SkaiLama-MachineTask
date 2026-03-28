import { useEffect, useState } from "react";
import { useGetEventsByProfile } from "../../hooks/useEvents";
import { useTimezoneStore } from "../../store/timezoneStore";
import TimeZoneSelector, {
  type TimezoneOption,
} from "../reusable/TimezoneSelector/TimezoneSelector";
import EventCard from "../ui/cards/EventCard/EventCard";
import "./EventContainer.css";
import { useProfileStore } from "../../store/profileStore";
import type { IEvent } from "../../types/interfaces/IEvent";
import { useEventStore } from "../../store/eventStore";

const EventContainer = () => {
  const { selectedTimezone, setSelectedTimezone } = useTimezoneStore();
  const { selectedProfile } = useProfileStore();
  const { events, setEvents } = useEventStore();

  const { getEventsByProfile } = useGetEventsByProfile();

  const fetchEventsByProfile = async () => {
    const res = await getEventsByProfile(selectedProfile?.id as string);
    setEvents(res.data || []);
  };
  useEffect(() => {
    if(selectedProfile){

      fetchEventsByProfile();
    }
  }, [selectedProfile]);
  return (
    <div className="event-container">
      <h1>Events</h1>
      <div className="timezone-section">
        <label>View In Timezone</label>
        <TimeZoneSelector
          value={selectedTimezone}
          onChange={(option: TimezoneOption | null) =>
            setSelectedTimezone(option as TimezoneOption)
          }
          mode="event-listing"
        />
      </div>
      <div className="event-listing">
        {events.map((event: IEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventContainer;
