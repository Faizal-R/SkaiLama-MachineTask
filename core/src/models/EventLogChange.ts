import { Schema, model } from "mongoose";
import { IEventLogChange } from "./interfaces/IEventLogChange.js";

const eventLogChangeSchema = new Schema<IEventLogChange>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    logId: {
      type: Schema.Types.ObjectId,
      ref: "EventLog",
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
    timestamps: { createdAt: true, updatedAt: false },
  }
);


export const EventLogChange = model<IEventLogChange>(
  "EventLogChange",
  eventLogChangeSchema
);