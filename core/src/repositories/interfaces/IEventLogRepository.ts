import { IBaseRepository } from "./IBaseRepository.js";
import { IEventLog } from "../../models/interfaces/IEventLogs.js";

export interface IEventLogRepository extends IBaseRepository<IEventLog> {}
