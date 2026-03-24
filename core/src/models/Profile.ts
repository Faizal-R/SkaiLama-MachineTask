import { model, Schema } from "mongoose";
import { IProfile } from "./interfaces/IProfile.js"

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      isRequired: true,
      minLength: 3,
    },
  },
  {
    timestamps: true,
  },
);

const ProfileModel = model<IProfile>("Profile", profileSchema);

export default ProfileModel;
