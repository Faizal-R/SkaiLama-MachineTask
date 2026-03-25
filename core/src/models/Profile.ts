import { model, Schema } from "mongoose";
import { IProfile } from "./interfaces/IProfile.js"

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      isRequired: true,
      minLength: 3,
      unique:true
    },
  },
  {
    timestamps: true,
  },
);

export const Profile = model<IProfile>("Profile", profileSchema);

