import { IProfileRepository } from "./interfaces/IProfileRepository.js";
import { IProfile } from "../models/interfaces/IProfile.js";
import { Profile } from "../models/Profile.js";
import { BaseRepository } from "./BaseRepository.js";
import { injectable } from "inversify";


@injectable()
export  class ProfileRepository
  extends BaseRepository<IProfile>
  implements IProfileRepository
{
  constructor() {
    super(Profile);
  }
}
