import { useEffect } from "react";
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
    if (!selectedProfile?.id) return;
    const res = await getEventsByProfile(selectedProfile.id);
    setEvents(res.data || []);
  };

  useEffect(() => {
    fetchEventsByProfile();
  }, [selectedProfile]);

  return (
    <div className="event-container">
      <h2 className="event-title">Events</h2>

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
        {events.length > 0 ? (
          events.map((event: IEvent) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="empty-state">No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventContainer;