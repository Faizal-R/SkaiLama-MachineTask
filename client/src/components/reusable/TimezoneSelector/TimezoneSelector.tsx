import type { FC } from "react";
import { TIMEZONE_OPTIONS } from "../../../constants/data/timezones";

import './TimezoneSelector.css'
import Select from "react-select";

export interface TimezoneOption {
  label: string;
  value: string;
}

interface ITimeZoneSelectorProps {
  mode?:string;
  value: TimezoneOption | null;
  onChange: (option: TimezoneOption | null) => void;
}

const TimeZoneSelector: FC<ITimeZoneSelectorProps> = ({ value, onChange,mode }) => {
  return (
    <Select<TimezoneOption>
      options={TIMEZONE_OPTIONS}
      value={value}
      onChange={onChange}
      isSearchable
      className={mode=="event-listing"?"timezone-selector":""}
    />
  );
};

export default TimeZoneSelector;
