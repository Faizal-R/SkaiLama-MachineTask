import { Types } from "mongoose";
import { IEventLog } from "../models/interfaces/IEventLogs.js";
import { EventLogResponseDTO } from "../dto/eventLog/EventLogResponseDTO.js";
import { ProfileMapper } from "./ProfileMapper.js";
import { ProfileResponseDTO } from "../dto/profile/ProfileResponseDTO.js";

export class EventLogMapper {
  static toResponse(log: IEventLog): EventLogResponseDTO {
    return {
      id: log._id.toString(),
      eventId: log.eventId.toString(),
      field: log.field,
      oldValue: this.serializeValue(log.oldValue),
      newValue: this.serializeValue(log.newValue),
      createdAt: log.createdAt.toISOString(),
    };
  }

  static toEntity(dto: Partial<IEventLog>): Partial<IEventLog> {
    return {
      ...dto,
      eventId: dto.eventId ? new Types.ObjectId(dto.eventId) : undefined,
    };
  }

  static toListResponse(entities: IEventLog[]): EventLogResponseDTO[] {
    return entities.map((e) => this.toResponse(e));
  }
  private static serializeValue(
    value: Types.ObjectId | Date | Types.ObjectId[],
  ): string | string[] |(string | ProfileResponseDTO)[] {
    if (value instanceof Date) {
      return value.toISOString();
    }

    if (Array.isArray(value)) {
      return value.map((v) => (v instanceof Types.ObjectId ? v.toString() : ProfileMapper.toResponse(v)));
    }

    if (value instanceof Types.ObjectId) {
      return value.toString();
    }

    return value;
  }
}
