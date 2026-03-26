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
export const toUTCISOString = (date: string, time: string, tz: string) => {
  return dayjs.tz(`${date} ${time}`, tz).utc().toISOString();
};

export const toZonedDate = (date: string, time: string, tz: string) => {
  return dayjs.tz(`${date} ${time}`, tz);
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

export const formateDateWithOrdinal = (date: string) => {
  return dayjs(date).format("MMMM Do YYYY");
};
