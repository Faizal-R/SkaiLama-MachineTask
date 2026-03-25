import { CreateEventDTO } from "../../dto/event/CreateEventDTO.js";
import { EventResponseDTO } from "../../dto/event/EventResponseDTO.js";

export interface IEventService{
    createEvent(dto:CreateEventDTO):Promise<EventResponseDTO>
}