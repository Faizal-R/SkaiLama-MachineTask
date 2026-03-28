import { TIMEZONE_OPTIONS } from "../constants/data/timezones";
import type { IEventLog } from "../types/interfaces/IEvent";
import { formatDateTimeParts } from "../utils/dateTime";

export const getLogMessage = (log:IEventLog, tz: string): string => {
  switch (log.field) {
    case "timezone":{
     const oldTimezone=TIMEZONE_OPTIONS.find(tz=>tz.value==log.oldValue)
     const newTimezone=TIMEZONE_OPTIONS.find(tz=>tz.value==log.newValue)
     
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
      const oldProfiles = (log.oldValue as string[]) || [];
      const newProfiles = (log.newValue as string[]) || [];

      const added = newProfiles.filter(id => !oldProfiles.includes(id));
      const removed = oldProfiles.filter(id => !newProfiles.includes(id));

      if (added.length && removed.length) {
        return `${added.length} participant(s) added, ${removed.length} removed`;
      }

      if (added.length) {
        return `${added.length} participant(s) added`;
      }

      if (removed.length) {
        return `${removed.length} participant(s) removed`;
      }

      return "Participants updated";
    }

    default:
      return "Event updated";
  }
};