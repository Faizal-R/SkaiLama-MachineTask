import "./EventForm.css";
import { TIMEZONE_OPTIONS } from "../../constants/data/timezones";
import { useRef, useState, type ChangeEvent, type FC } from "react";
import TimeZoneSelector from "../reusable/TimezoneSelector/TimezoneSelector";
import { formateDateWithOrdinal, getEventPayload } from "../../utils/dateTime";
import { Calendar } from "lucide-react";
import UserSelector from "../UserSelector/UserSelector";
import { toast } from "sonner";
import { useCreateEvent } from "../../hooks/useEvents";
interface IEventFormProps {
  onClose: () => void;
}
interface IEventForm {
  profiles: string[];
  timezone: {
    label: string;
    value: string;
  };
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const EventForm: FC<IEventFormProps> = ({ onClose }) => {
  const [eventForm, setEventForm] = useState<IEventForm>({
    profiles: [],
    timezone: {
      label: TIMEZONE_OPTIONS[0].label,
      value: TIMEZONE_OPTIONS[0].value,
    },
    startDate: "",
    endDate: "",
    startTime: "09:00",
    endTime: "09:00",
  });

  const { isLoading, createEvent } = useCreateEvent();

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const onHandleProfiles = (profileId: string) => {
    if (eventForm.profiles.includes(profileId)) {
      const profilesAfterRemoval = eventForm.profiles.filter(
        (p) => p !== profileId,
      );
      setEventForm((prev) => ({ ...prev, profiles: profilesAfterRemoval }));
    } else {
      setEventForm((prev) => ({
        ...prev,
        profiles: [...prev.profiles, profileId],
      }));
    }
  };

  const onHandleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value, formateDateWithOrdinal(value));
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async () => {
    if (!eventForm.profiles.length) {
      toast.error("Add Atleast 1 Profile");
      return;
    }
    const payload = {
      ...getEventPayload(
        eventForm.startDate,
        eventForm.startTime,
        eventForm.endDate,
        eventForm.endTime,
        eventForm.timezone.value,
      ),
      profiles: eventForm.profiles,
    };

    const response = await createEvent(payload);

    toast(response.message);

    setEventForm({
      profiles: [],
      timezone: {
        label: TIMEZONE_OPTIONS[0].label,
        value: TIMEZONE_OPTIONS[0].value,
      },
      startDate: "",
      endDate: "",
      startTime: "09:00",
      endTime: "09:00",
    });
    onClose();
  };

  return (
    <div className="wrapper">
      <div className="card">
        <h2>Create Event</h2>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <label>Profiles</label>
        <UserSelector
          selectedProfiles={eventForm.profiles || []}
          mode="event-form"
          onHandleProfiles={onHandleProfiles}
        />

        <div className="field">
          <label>Timezone</label>
          <TimeZoneSelector
            value={eventForm.timezone}
            onChange={(option) =>
              setEventForm((prev) => ({
                ...prev,
                timezone: option as (typeof eventForm)["timezone"],
              }))
            }
          />
        </div>

        <div className="field">
          <label>Start Date & Time</label>
          <div className="row">
            <div
              onClick={() => startDateRef.current?.showPicker()}
              className="fake-date-input"
            >
              <Calendar size={17} />
              <div>
                {eventForm.startDate
                  ? formateDateWithOrdinal(eventForm.startDate)
                  : "Pick a date"}
              </div>
            </div>

            <input
              ref={startDateRef}
              name="startDate"
              onChange={onHandleForm}
              type="date"
            />
            <input
              name="startTime"
              onChange={onHandleForm}
              value={eventForm.startTime}
              type="time"
            />
          </div>
        </div>

        <div className="field">
          <label>End Date & Time</label>
          <div className="row">
            <div
              onClick={() => endDateRef.current?.showPicker()}
              className="fake-date-input"
            >
              <Calendar size={17} />
              <div>
                {eventForm.endDate
                  ? formateDateWithOrdinal(eventForm.endDate)
                  : "Pick a date"}
              </div>
            </div>
            <input
              ref={endDateRef}
              name="endDate"
              type="date"
              onChange={onHandleForm}
            />
            <input
              name="endTime"
              value={eventForm.endTime}
              onChange={onHandleForm}
              type="time"
            />
          </div>
        </div>

        <button onClick={onFormSubmit} className="btn">
          {isLoading ? "Loading..." : "+ Create Event"}
        </button>
      </div>
    </div>
  );
};

export default EventForm;
