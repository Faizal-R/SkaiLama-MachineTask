import { QueryFilter } from "mongoose";
import { IEvent } from "../../models/interfaces/IEvent.js";
import { IBaseRepository } from "./IBaseRepository.js";

export interface IEventRepository extends IBaseRepository<IEvent> {
  getAllEventsByProfile(query: QueryFilter<IEvent>): Promise<IEvent[]>;
  getEventDetails(query: QueryFilter<IEvent>): Promise<IEvent|null>;
}
