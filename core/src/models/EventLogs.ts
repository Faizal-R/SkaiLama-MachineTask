import mongoose, { Schema, model } from "mongoose";
import { IEventLog } from "./interfaces/IEventLogs.js";

const eventLogSchema = new Schema<IEventLog>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);


export  const EventLog = model<IEventLog>("EventLog", eventLogSchema);