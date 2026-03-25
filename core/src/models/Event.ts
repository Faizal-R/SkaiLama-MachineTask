import { Schema, Types, model } from "mongoose";
import { IEvent } from "./interfaces/IEvent.js";

const eventSchema = new Schema<IEvent>(
  {
    profiles: [
      {
        type: Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    ],

    timezone: {
      type: String,
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Event = model<IEvent>("Event", eventSchema);

