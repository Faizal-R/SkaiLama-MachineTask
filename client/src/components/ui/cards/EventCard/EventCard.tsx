import { Users, Calendar, Clock, Pencil, FileText } from "lucide-react";
import "./EventCard.css";
import EventManagementModal from "../../modals/EventManagementModal/EventManagementModal";
import { useState, type FC } from "react";
import type { IEvent } from "../../../../types/interfaces/IEvent";
import type { IProfile } from "../../../../types/interfaces/IProfile";
import { formatDateTimeParts } from "../../../../utils/dateTime";
import { useTimezoneStore } from "../../../../store/timezoneStore";
import { useEventStore } from "../../../../store/eventStore";
import EventLogHistoryModal from "../../modals/EventLogHistoryModal/EventLogHistoryModal";

interface IEventCardProps {
  event: IEvent;
}

const EventCard: FC<IEventCardProps> = ({ event }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEventLogHistoryOpen, setIsEventLogHistoryOpen] = useState(false);
  const { selectedTimezone } = useTimezoneStore();
  const { setSelectedEventId } = useEventStore();
  const onHandleEditEvent = (eventId: string) => {
    setIsEditModalOpen(true);
    setSelectedEventId(eventId);
  };

  return (
    <div className="card">
      <div className="row">
        <Users size={16} className="icon" />
        <span className="text">
          {event.profiles
            .map((p: IProfile | string) => (p as IProfile).name)
            .join(", ")}
        </span>
      </div>

      <div className="row">
        <Calendar size={16} className="icon" />
        <div>
          <div className="label">
            <strong>Start:</strong>
            {formatDateTimeParts(event.startTime, selectedTimezone.value).date}
          </div>
          <div className="sub">
            <Clock size={13} className="icon small" />
            {formatDateTimeParts(event.startTime, selectedTimezone.value).time}
          </div>
        </div>
      </div>

      <div className="row">
        <Calendar size={16} className="icon" />
        <div>
          <div className="label">
            <strong>End:</strong>{" "}
            {formatDateTimeParts(event.endTime, selectedTimezone.value).date}
          </div>
          <div className="sub">
            <Clock size={13} className="icon small" />
            {formatDateTimeParts(event.endTime, selectedTimezone.value).time}
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="meta">
        <p>
          Created:{" "}
          {`${formatDateTimeParts(event.createdAt as string, selectedTimezone.value).date} 
          at ${formatDateTimeParts(event.createdAt as string, selectedTimezone.value).time}`}
        </p>
        <p>
          Updated:{" "}
          {`${formatDateTimeParts(event.updatedAt as string, selectedTimezone.value).date} 
          at ${formatDateTimeParts(event.updatedAt as string, selectedTimezone.value).time}`}
        </p>
      </div>

      <div className="actions">
        <button
          onClick={() => onHandleEditEvent(event.id as string)}
          className="btn"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          onClick={() => {
            setIsEventLogHistoryOpen(true);
            setSelectedEventId(event.id as string);
          }}
          className="btn"
        >
          <FileText size={14} />
          View Logs
        </button>
      </div>
      <EventLogHistoryModal
        isOpen={isEventLogHistoryOpen}
        onClose={() => {
          setIsEventLogHistoryOpen(false);
          setSelectedEventId(null);
        }}
      />
      <EventManagementModal
        mode="edit-event"
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEventId(null);
        }}
      />
    </div>
  );
};

export default EventCard;
