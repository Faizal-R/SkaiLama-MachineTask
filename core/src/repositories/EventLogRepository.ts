import { IEventLogRepository } from "./interfaces/IEventLogRepository.js";
import { IEventLog } from "../models/interfaces/IEventLogs.js";
import { EventLog } from "../models/EventLogs.js";
import { BaseRepository } from "./BaseRepository.js";
import { injectable } from "inversify";
@injectable()
export class EventLogRepository
  extends BaseRepository<IEventLog>
  implements IEventLogRepository
{
  constructor() {
    super(EventLog);
  }
}
