import type { FC } from "react";
import { TIMEZONE_OPTIONS } from "../../../constants/data/timezones";


import Select from "react-select";

interface TimezoneOption {
  label: string;
  value: string;
}

interface ITimeZoneSelectorProps {
  value: TimezoneOption | null;
  onChange: (option: TimezoneOption | null) => void;
}

const TimeZoneSelector: FC<ITimeZoneSelectorProps> = ({ value, onChange }) => {
  return (
    <Select<TimezoneOption>
      options={TIMEZONE_OPTIONS}
      value={value}
      onChange={onChange}
      isSearchable
    />
  );
};

export default TimeZoneSelector;
