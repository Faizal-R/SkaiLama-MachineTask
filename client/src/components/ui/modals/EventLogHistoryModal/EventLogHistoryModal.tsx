import { useEffect, useState, type FC } from "react";
import "./EventLogHistoryModal.css";
import { useGetAllLogsByEvent } from "../../../../hooks/useEvents";
import { useEventStore } from "../../../../store/eventStore";
import { getLogMessage } from "../../../../helper/getLogMessage";
import { useTimezoneStore } from "../../../../store/timezoneStore";
import { formatDateTimeParts } from "../../../../utils/dateTime";
import type { IEventLog } from "../../../../types/interfaces/IEvent";
interface IEventLogHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const EventLogHistoryModal:FC<IEventLogHistoryModalProps> = ({
  isOpen,
  onClose,

}) => {
  if (!isOpen) return null;
  const [logs, setLogs] = useState<IEventLog[]>([]);

  const { selectedEventId } = useEventStore();
  const { selectedTimezone } = useTimezoneStore();

  const { getAllLogsByEvent } = useGetAllLogsByEvent();

  const fetchAllLogs = async () => {
    const response = await getAllLogsByEvent(selectedEventId as string);
    if (response.success) {
      console.log(response.data);
      setLogs(response.data);
    }
  };

  useEffect(() => {
    fetchAllLogs();
  }, []);

  return (
    <div className="elh-overlay">
      <div className="elh-container">
        <div className="elh-header">
          <h2>Event Update History</h2>
          <button className="elh-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="elh-body">
          {logs.length === 0 ? (
            <div className="elh-empty">No history available</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="elh-item">
                <div className="elh-time">
                  Edited:{" "}
                  {`${formatDateTimeParts(log.createdAt as string, selectedTimezone.value).date} 
                          at ${formatDateTimeParts(log.createdAt as string, selectedTimezone.value).time}`}
                </div>
                <div className="elh-message">
                  {getLogMessage(log, selectedTimezone.value)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventLogHistoryModal;
