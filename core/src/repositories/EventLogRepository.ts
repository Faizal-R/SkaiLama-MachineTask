import { IEventLogRepository } from "./interfaces/IEventLogRepository.js";
import { IEventLog } from "../models/interfaces/IEventLogs.js";
import { EventLog } from "../models/EventLogs.js";
import { BaseRepository } from "./BaseRepository.js";
import { inject, injectable } from "inversify";
import { QueryFilter } from "mongoose";
import { DI_TOKENS } from "../di/types.js";
import type { IProfileRepository } from "./interfaces/IProfileRepository.js";
@injectable()
export class EventLogRepository
  extends BaseRepository<IEventLog>
  implements IEventLogRepository
{
  constructor(@inject(DI_TOKENS.REPOSITORIES.PROFILE) private _profileRepository:IProfileRepository) {
    super(EventLog);
  }
 async getAllLogsByEventWithPopulate(query: QueryFilter<IEventLog>) {
  const logs = await this.model.find(query).lean();

  for (const log of logs) {
    if (log.field === "profiles") {
      log.oldValue = await this._profileRepository.find({
        _id: { $in: log.oldValue || [] }
      });

      log.newValue = await this._profileRepository.find({
        _id: { $in: log.newValue || [] }
      });
    }
  }

  return logs;
}
}
