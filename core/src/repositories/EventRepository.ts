import { IEventRepository } from "./interfaces/IEventRepository.js";
import { IEvent } from "../models/interfaces/IEvent.js";
import { Event } from "../models/Event.js";
import { BaseRepository } from "./BaseRepository.js";
import { injectable } from "inversify";
@injectable()
export  class EventRepository
  extends BaseRepository<IEvent>
  implements IEventRepository
{
  constructor() {
    super(Event);
  }
}
