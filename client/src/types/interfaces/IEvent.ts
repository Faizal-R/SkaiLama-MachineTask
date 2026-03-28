import type { IProfile } from "./IProfile";

export interface IEvent {
  id?: string;
  profiles: string[] | IProfile[];
  timezone: string;
  startTime: string;
  endTime: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEventLog {
  id: string;
  eventId: string;
  field: "timezone" | "profiles" | "startTime" | "endTime";
  oldValue: any;
  newValue: any;
  createdAt: string;
}
