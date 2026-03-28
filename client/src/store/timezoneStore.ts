import { create } from "zustand";
import { TIMEZONE_OPTIONS } from "../constants/data/timezones";
import type { TimezoneOption } from "../components/reusable/TimezoneSelector/TimezoneSelector";

interface ITimezoneStore {
  selectedTimezone: TimezoneOption
  setSelectedTimezone:(timezone:TimezoneOption)=>void
}
export const useTimezoneStore = create<ITimezoneStore>((set) => ({
  selectedTimezone: TIMEZONE_OPTIONS[0],
  setSelectedTimezone: (timezone: ITimezoneStore["selectedTimezone"]) => {
    set({
      selectedTimezone: timezone,
    });
  },
}));
