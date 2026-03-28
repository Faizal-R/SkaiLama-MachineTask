import { IBaseRepository } from "./IBaseRepository.js";
import { IEventLog } from "../../models/interfaces/IEventLogs.js";
import { QueryFilter } from "mongoose";

export interface IEventLogRepository extends IBaseRepository<IEventLog> {
    getAllLogsByEventWithPopulate(query: QueryFilter<IEventLog>):Promise<IEventLog[]>
}
