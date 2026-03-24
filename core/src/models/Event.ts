import { Schema, Types, model } from "mongoose";

const eventSchema = new Schema(
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

const profileModel = model("Event", eventSchema);

export default profileModel;
