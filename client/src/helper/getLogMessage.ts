import { TIMEZONE_OPTIONS } from "../constants/data/timezones";
import type { IEventLog } from "../types/interfaces/IEvent";
import { formatDateTimeParts } from "../utils/dateTime";

export const getLogMessage = (log: IEventLog, tz: string): string => {
  switch (log.field) {
    case "timezone": {
      const oldTimezone = TIMEZONE_OPTIONS.find(
        (tz) => tz.value == log.oldValue,
      );
      const newTimezone = TIMEZONE_OPTIONS.find(
        (tz) => tz.value == log.newValue,
      );

      return `Timezone changed from ${oldTimezone?.label} to ${newTimezone?.label}`;
    }

    case "startTime": {
      const oldDT = formatDateTimeParts(log.oldValue as string, tz);
      const newDT = formatDateTimeParts(log.newValue as string, tz);

      return `Start changed from ${oldDT.date} ${oldDT.time} to ${newDT.date} ${newDT.time}`;
    }

    case "endTime": {
      const oldDT = formatDateTimeParts(log.oldValue as string, tz);
      const newDT = formatDateTimeParts(log.newValue as string, tz);

      return `End changed from ${oldDT.date} ${oldDT.time} to ${newDT.date} ${newDT.time}`;
    }

    case "profiles": {
      const oldProfiles = (log.oldValue as { name: string }[]) || [];
      const newProfiles = (log.newValue as { name: string }[]) || [];

      const oldNames = oldProfiles.map((p) => p.name).join(", ");
      const newNames = newProfiles.map((p) => p.name).join(", ");

      return `Participants changed from [${oldNames || "None"}] to [${newNames || "None"}]`;
    }

    default:
      return "Event updated";
  }
};
