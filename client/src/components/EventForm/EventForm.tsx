import "./EventForm.css";
import { TIMEZONE_OPTIONS } from "../../constants/data/timezones";
import { useEffect, useRef, useState, type ChangeEvent, type FC } from "react";
import TimeZoneSelector from "../reusable/TimezoneSelector/TimezoneSelector";
import {
  formatDateWithOrdinal,
  getEventPayload,
  splitISOToDateTime,
} from "../../utils/dateTime";
import { Calendar } from "lucide-react";
import UserSelector from "../reusable/UserSelector/UserSelector";
import { toast } from "sonner";
import {
  useCreateEvent,
  useGetEventDetails,
  useUpdateEventDetails,
} from "../../hooks/useEvents";
import type { IProfile } from "../../types/interfaces/IProfile";
import { useEventStore } from "../../store/eventStore";
interface IEventFormProps {
  onClose: () => void;
  mode: string;
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

const EventForm: FC<IEventFormProps> = ({ mode, onClose }) => {
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
  const [changedFields, setChangedFields] = useState<{
    startTime?: boolean;
    endTime?: boolean;
    startDate?: boolean;
    endDate?: boolean;
  }>({});

  const { selectedEventId } = useEventStore();
  const { updateEvent } = useEventStore();

  const { isLoading, createEvent } = useCreateEvent();
  const { getEventDetails } = useGetEventDetails();
  const { isLoading: isEventFormUpdating, updateEventDetails } =
    useUpdateEventDetails();

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const onHandleProfiles = (profile: string | IProfile) => {
    if (eventForm.profiles.includes(profile as string)) {
      const profilesAfterRemoval = eventForm.profiles.filter(
        (p) => p !== profile,
      );
      setEventForm((prev) => ({ ...prev, profiles: profilesAfterRemoval }));
    } else {
      setEventForm((prev) => ({
        ...prev,
        profiles: [...prev.profiles, profile as string],
      }));
    }
  };

  const onHandleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      name === "startDate" ||
      name === "startTime" ||
      name === "endDate" ||
      name === "endTime"
    ) {
      setChangedFields((prev) => ({
        ...prev,
        [name]: true,
      }));
    }

    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async () => {
    if (!eventForm.profiles.length) {
      toast.error("Add Atleast 1 Profile");
      return;
    }

    const payload: any = {
      profiles: eventForm.profiles,
      timezone: eventForm.timezone.value,
      id: selectedEventId ? selectedEventId : "",
    };

    if (mode !== "edit-event") {
      Object.assign(
        payload,
        getEventPayload(
          eventForm.startDate,
          eventForm.startTime,
          eventForm.endDate,
          eventForm.endTime,
          eventForm.timezone.value,
        ),
      );
    } else {
      const fullPayload = getEventPayload(
        eventForm.startDate,
        eventForm.startTime,
        eventForm.endDate,
        eventForm.endTime,
        eventForm.timezone.value,
      );

      if (changedFields.startDate || changedFields.startTime) {
        payload.startTime = fullPayload.startTime;
      }

      if (changedFields.endDate || changedFields.endTime) {
        payload.endTime = fullPayload.endTime;
      }
    }

    const apiCall = mode == "edit-event" ? updateEventDetails : createEvent;
    const response = await apiCall(payload);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (mode == "edit-event") {
      updateEvent(response.data);
    }

    toast.success(response.message);
    onClose();
    resetForm();
    setChangedFields({});
  };

  const resetForm = () => {
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
  };

  const fetchEventDetails = async () => {
    const response = await getEventDetails(selectedEventId as string);
    if (response.success) {
      console.log(response);
      const { date: startDate, time: startTime } = splitISOToDateTime(
        response.data.startTime,
      );
      const { date: endDate, time: endTime } = splitISOToDateTime(
        response.data.endTime,
      );
      setEventForm({
        timezone:
          TIMEZONE_OPTIONS.find((tz) => tz.value === response.data.timezone) ??
          TIMEZONE_OPTIONS[0],
        startDate,
        startTime,
        endDate,
        endTime,
        profiles: response.data.profiles,
      });
    }
  };

  useEffect(() => {
    if (selectedEventId) {
      fetchEventDetails();
    }
  }, [selectedEventId]);

  return (
    <div className="wrapper">
      <div className="card">
        <h2>{mode == "edit-event" ? "Edit Event" : "Create Event"}</h2>
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
                  ? formatDateWithOrdinal(eventForm.startDate)
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
                  ? formatDateWithOrdinal(eventForm.endDate)
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
          {mode == "edit-event"
            ? isEventFormUpdating
              ? "Loading..."
              : "+ Edit Event"
            : isLoading
              ? "Loading..."
              : "+ Create Event"}
        </button>
      </div>
    </div>
  );
};

export default EventForm;
