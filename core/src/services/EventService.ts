import { inject, injectable } from "inversify";
import type { IEventRepository } from "../repositories/interfaces/IEventRepository.js";
import { DI_TOKENS } from "../di/types.js";
import { IEventService } from "./interfaces/IEventService.js";
import { CreateEventDTO } from "../dto/event/CreateEventDTO.js";
import { EventResponseDTO } from "../dto/event/EventResponseDTO.js";
import { EventMapper } from "../mapper/EventMapper.js";
@injectable()
export class EventService implements IEventService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.EVENT)
    private _eventRepository: IEventRepository,
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
}
