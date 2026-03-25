import { inject, injectable } from "inversify";
import { DI_TOKENS } from "../di/types.js";
import type { IEventLogRepository } from "../repositories/interfaces/IEventLogRepository.js";
@injectable()
export class EventLogService {
  constructor(
    @inject(DI_TOKENS.REPOSITORIES.EVENT_LOG)
    private _eventLogRepository: IEventLogRepository,
  ) {}
}
