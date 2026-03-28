import { Document, Types } from "mongoose";
import { IProfile } from "./IProfile.js";

export interface IEvent extends Document {
  _id: Types.ObjectId;
  profiles: Types.ObjectId[] | IProfile[];
  timezone: string;
  startTime: Date;
  endTime: Date;
  createdAt:Date,
  updatedAt:Date
}
