import { EventLogResponseDTO } from "../../dto/eventLog/EventLogResponseDTO.js";
import { IEvent } from "../../models/interfaces/IEvent.js";

export interface IEventLogService {
  createEventLogs(
    previousEvent: IEvent,
    updatedEvent: IEvent,
  ): Promise<EventLogResponseDTO[]>;

  getAllLogsByEvent(eventId:string):Promise<EventLogResponseDTO[]>
}
