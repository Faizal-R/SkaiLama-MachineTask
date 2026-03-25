import { CreateProfileDTO } from "../../dto/profile/CreateProfileDTO.js";
import { ProfileResponseDTO } from "../../dto/profile/ProfileResponseDTO.js";

export interface IProfileService {
  createProfile(data: CreateProfileDTO): Promise<ProfileResponseDTO>;
  getAllProfiles():Promise<ProfileResponseDTO[]>
}
