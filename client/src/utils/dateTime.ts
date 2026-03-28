import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
export const formatDateTimeParts = (isoString: string, tz: string) => {
  const d = dayjs.utc(isoString).tz(tz);

  return {
    date: d.format("MMM DD, YYYY"),  
    time: d.format("hh:mm A"),       
  };
};
export const splitISOToDateTime = (isoString: string) => {
  const d = dayjs(isoString);

  return {
    date: d.format("YYYY-MM-DD"),
    time: d.format("HH:mm"),
  };
};
export const toUTCISOString = (date: string, time: string, tz: string) => {
  return dayjs.tz(`${date} ${time}`, tz).utc().toISOString();
};

export const getEventPayload = (
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  tz: string,
) => {
  const start = dayjs.tz(`${startDate} ${startTime}`, tz);

  let end = dayjs.tz(`${endDate} ${endTime}`, tz);

  if (end.isBefore(start)) {
    end = end.add(1, "day");
  }

  return {
    startTime: start.utc().toISOString(),
    endTime: end.utc().toISOString(),
    timezone: tz,
  };
};

export const formatDateWithOrdinal = (date: string) => {
  return dayjs(date).format("MMMM Do YYYY");
};
