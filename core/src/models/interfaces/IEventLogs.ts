import { Types, Document } from "mongoose";
export type LoggableFields = "timezone" | "profiles" | "startTime" | "endTime";
export interface IEventLog extends Document {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  field: LoggableFields;
  oldValue: any;
  newValue: any;
  createdAt:Date
}
