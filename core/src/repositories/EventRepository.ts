import { IEventRepository } from "./interfaces/IEventRepository.js";
import { IEvent } from "../models/interfaces/IEvent.js";
import { Event } from "../models/Event.js";
import { BaseRepository } from "./BaseRepository.js";
import { injectable } from "inversify";
import { QueryFilter } from "mongoose";
@injectable()
export class EventRepository
  extends BaseRepository<IEvent>
  implements IEventRepository
{
  constructor() {
    super(Event);
  }
  getAllEventsByProfile(query: QueryFilter<IEvent>) {
    return this.model.find(query).populate("profiles");
  }
  getEventDetails(query: QueryFilter<IEvent>): Promise<IEvent | null> {
    return this.model.findOne(query).populate("profiles");
  }
}
