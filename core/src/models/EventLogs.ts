import mongoose, { Schema, Types, model } from "mongoose";
import { IEventLog } from "./interfaces/IEventLogs.js";

const eventLogSchema = new Schema<IEventLog>(
  {
    eventId: {
      type: Types.ObjectId,
      ref: "Event",
      required: true,
    },
    field: {
      type: String,
      enum: ["timezone", "profiles", "startTime", "endTime"],
      required: true,
    },
    oldValue: {
      type: Schema.Types.Mixed,
    },
    newValue: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

export const EventLog = model<IEventLog>("EventLog", eventLogSchema);
