import { Document, Types } from "mongoose";

export interface IEvent extends Document {
  _id: Types.ObjectId;
  profiles: Types.ObjectId[];
  timezone: string;
  startTime: Date;
  endTime: Date;
}
