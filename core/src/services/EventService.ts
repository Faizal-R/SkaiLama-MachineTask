import { inject, injectable } from "inversify";
import type { IEventRepository } from "../repositories/interfaces/IEventRepository.js";
import { DI_TOKENS } from "../di/types.js";
import { IEventService } from "./interfaces/IEventService.js";
import { CreateEventDTO } from "../dto/event/CreateEventDTO.js";
import { EventResponseDTO } from "../dto/event/EventResponseDTO.js";
import { EventMapper } from "../mapper/EventMapper.js";
import { Types } from "mongoose";
import { CustomError } from "../errors/customError.js";
import { statusCodes } from "../constants/enums/statusCodes.js";
import { UpdateEventDTO } from "../dto/event/UpdateEventDTO.js";
import { IEvent } from "../models/interfaces/IEvent.js";

import type { IEventLogService } from "./interfaces/IEventLogService.js";
@injectable()
export class EventService implements IEventService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.EVENT)
    private _eventRepository: IEventRepository,
    @inject(DI_TOKENS.SERVICES.EVENT_LOG)
    private _eventLogService: IEventLogService,
  ) {}
  async createEvent(dto: CreateEventDTO): Promise<EventResponseDTO> {
    try {
      const entity = EventMapper.toEntity(dto);
      const createdEvent = await this._eventRepository.create(entity);
      return EventMapper.toResponse(createdEvent);
    } catch (error) {
      throw error;
    }
  }
  async getEventsByProfile(profileId: string): Promise<EventResponseDTO[]> {
    try {
      const events = await this._eventRepository.getAllEventsByProfile({
        profiles: { $in: [new Types.ObjectId(profileId)] },
      });
      return EventMapper.toListResponse(events);
    } catch (error) {
      throw error;
    }
  }
  async getEventDetails(eventId: string): Promise<EventResponseDTO> {
    try {
      const event = await this._eventRepository.findOne({
        _id: eventId,
      });

      if (!event) {
        throw new CustomError("No Event Found", statusCodes.NOT_FOUND);
      }

      return EventMapper.toResponse(event);
    } catch (error) {
      throw error;
    }
  }
  async updateEventDetails(dto: UpdateEventDTO): Promise<EventResponseDTO> {
    try {
      const exsitingEvent = await this._eventRepository.getEventDetails({_id:dto.id});

      await this._eventRepository.update(dto.id, dto);

      const updatedEvent = await this._eventRepository.getEventDetails({
        _id: dto.id,
      });
      const createdLogs = await this._eventLogService.createEventLogs(
        exsitingEvent!,
        updatedEvent!,
      );
      console.log("Created Logs",createdLogs[0].newValue);
      return EventMapper.toResponse(updatedEvent as IEvent);
    } catch (error) {
      throw error;
    }
  }
}
