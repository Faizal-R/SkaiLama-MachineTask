import { CreateProfileDTO } from "../dto/profile/CreateProfileDTO.js";
import { ProfileResponseDTO } from "../dto/profile/ProfileResponseDTO.js";
import { IProfile } from "../models/interfaces/IProfile.js";

export class ProfileMapper {
  static toEntity(dto: CreateProfileDTO): Partial<IProfile> {
    return {
      name: dto.name,
    };
  }

  static toResponse(entity: IProfile): ProfileResponseDTO {
    return {
      id: entity._id.toString(),
      name: entity.name,
    };
  }
  static toListResponse(entities: IProfile[]): ProfileResponseDTO[] {
    return entities.map(this.toResponse);
  }
}
