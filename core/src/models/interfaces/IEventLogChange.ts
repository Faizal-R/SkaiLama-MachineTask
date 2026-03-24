
import { Types, Document } from "mongoose";
type LoggableFields = "timezone" | "profiles" | "startTime" | "endTime";

export interface IEventLogChange extends Document {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  logId: Types.ObjectId;
  field: LoggableFields;
  oldValue: any;
  newValue: any;
}