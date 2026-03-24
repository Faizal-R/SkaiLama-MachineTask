import { Types, Document } from "mongoose";

export interface IEventLog extends Document {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}


