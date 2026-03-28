import { CreateEventDTO } from "../dto/event/CreateEventDTO.js";
import { EventResponseDTO } from "../dto/event/EventResponseDTO.js";
import { IEvent } from "../models/interfaces/IEvent.js";
import { Types } from "mongoose";
import { ProfileMapper } from "./ProfileMapper.js";
import { IProfile } from "../models/interfaces/IProfile.js";

export class EventMapper {
  static toEntity(dto: CreateEventDTO): Partial<IEvent> {
    return {
      profiles: dto.profiles.map((p) => new Types.ObjectId(p)),
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      timezone: dto.timezone,
    };
  }
  static toResponse(entity: IEvent): EventResponseDTO {
    return {
      id: entity._id.toString(),
      profiles: entity.profiles.map((p: any) =>
        p instanceof Types.ObjectId
          ? p.toString()
          : ProfileMapper.toResponse(p as IProfile),
      ),
      timezone: entity.timezone,
      startTime: entity.startTime.toISOString(),
      endTime: entity.endTime.toISOString(),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  static toListResponse(entities: IEvent[]): EventResponseDTO[] {
    return entities.map((entity) => this.toResponse(entity));
  }
}
