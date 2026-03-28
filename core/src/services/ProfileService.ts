import { inject } from "inversify";
import { IProfileService } from "./interfaces/IProfileService.js";
import { DI_TOKENS } from "../di/types.js";
import type { IProfileRepository } from "../repositories/interfaces/IProfileRepository.js";
import { CreateProfileDTO } from "../dto/profile/CreateProfileDTO.js";
import { ProfileResponseDTO } from "../dto/profile/ProfileResponseDTO.js";
import { ProfileMapper } from "../mapper/ProfileMapper.js";
import { CustomError } from "../errors/customError.js";
import { statusCodes } from "../constants/enums/statusCodes.js";
import { MongoErrorCodes } from "../constants/enums/mongoErrorCodes.js";

export class ProfileService implements IProfileService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.PROFILE)
    private _profileRespository: IProfileRepository,
  ) {}

  async createProfile(dto: CreateProfileDTO): Promise<ProfileResponseDTO> {
    try {
      const entity = ProfileMapper.toEntity(dto);
      const createdProfile = await this._profileRespository.create(entity);
      return ProfileMapper.toResponse(createdProfile);
    } catch (error: any) {
        console.log(error)
      if (error.code == MongoErrorCodes.DUPLICATE_KEY) {
        throw new CustomError(
          "A profile with this name already exists. Please use a different name.",
          statusCodes.CONFLICT,
        );
      }
      throw error;
    }
  }
  async getAllProfiles(): Promise<ProfileResponseDTO[]> {
    try {
      const profileEntities = await this._profileRespository.find();
      return ProfileMapper.toListResponse(profileEntities);
    } catch (error) {
      throw error;
    }
  }
}
