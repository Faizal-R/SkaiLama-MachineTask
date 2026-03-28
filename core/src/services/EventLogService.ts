import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../di/types.js";
import type { IEventLogRepository } from "../repositories/interfaces/IEventLogRepository.js";
import { IEventLogService } from "./interfaces/IEventLogService.js";
import { IEvent } from "../models/interfaces/IEvent.js";
import { IEventLog, LoggableFields } from "../models/interfaces/IEventLogs.js";
import { EventLogMapper } from "../mapper/EventLogMapper.js";
import { EventLogResponseDTO } from "../dto/eventLog/EventLogResponseDTO.js";

import dayjs from "dayjs";
@injectable()
export class EventLogService implements IEventLogService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.EVENT_LOG)
    private _eventLogRepository: IEventLogRepository,
  ) {}
  async createEventLogs(
    previousEvent: IEvent,
    updatedEvent: IEvent,
  ): Promise<EventLogResponseDTO[]> {
    const fieldsToTrack: LoggableFields[] = [
      "timezone",
      "profiles",
      "startTime",
      "endTime",
    ];
    console.log("PreviousEvent", previousEvent);
    console.log("Updated Event", updatedEvent);

    const logs = [];

    for (const field of fieldsToTrack) {
      const oldValue = previousEvent[field];
      const newValue = updatedEvent[field];

      const isSameTime = (a: any, b: any) =>
        dayjs(a).valueOf() === dayjs(b).valueOf();

      if (
        field === "startTime" || field === "endTime"
          ? !isSameTime(oldValue, newValue)
          : JSON.stringify(oldValue) !== JSON.stringify(newValue)
      ) {
        const entity = EventLogMapper.toEntity({
          eventId: previousEvent._id,
          field,
          oldValue,
          newValue,
        });
        logs.push(entity);
      }
    }
    if (!logs.length) {
      return [];
    }
    const createdLogs = await this._eventLogRepository.insertMany(
      logs as IEventLog[],
    );
    return EventLogMapper.toListResponse(createdLogs);
  }

  async getAllLogsByEvent(eventId: string) {
    try {
      const logs = await this._eventLogRepository.getAllLogsByEventWithPopulate(
        { eventId },
      );
      return EventLogMapper.toListResponse(logs);
    } catch (error) {
      throw error;
    }
  }
}
