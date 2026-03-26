import { IEventLogChange } from "../models/interfaces/IEventLogChange.js";
import { EventLogChange } from "../models/EventLogChange.js";
import { IEventLogChangeRepository } from "./interfaces/IEventLogChangeRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import { injectable } from "inversify";
@injectable()
export class EventLogChangeRepository
  extends BaseRepository<IEventLogChange>
  implements IEventLogChangeRepository
{
  constructor() {
    super(EventLogChange);
  }
}
